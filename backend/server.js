require('dotenv').config();

const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");

const authMiddleware = require('./authMiddleware');
const { getCurrentUrl, getCognitoJWTPublicKey } = require('./utils');

const upload = require('./upload-s3.js');
const { ListObjectsV2Command } = require('@aws-sdk/client-s3');
const s3 = require('./client.js');

global.jwtSigningKey;
let config;
let oidc;

async function initializeServer() {
    try {
        oidc = await import('openid-client');
        
        const serverUrl = new URL(`https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`);

        const clientId = process.env.COGNITO_CLIENT_ID;
        const clientSecret = process.env.COGNITO_CLIENT_SECRET;
        
        config = await oidc.discovery(
            serverUrl,
            clientId,
            clientSecret
        );
        
        // console.log("OpenID configuration successfully loaded");
        
        // Fetch PEM Key to verify ACCESS Token
        jwtSigningKey = await getCognitoJWTPublicKey(serverUrl.href + "/.well-known/jwks.json");
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const app = express();
const port = process.env.PORT || 3000;

// List of allowed origins
const allowedOrigins = [process.env.ORIGIN,'https://bbtnote-v2.onrender.com'];

// CORS middleware
const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Custom-Header"],
    credentials: true,
    maxAge: 10,
};

// Enable CORS with the options
app.use(cors(corsOptions));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(authMiddleware);

app.get('/login', async (req, res) => {
    try {
        console.log("login sended");
        
        const code_verifier = oidc.randomPKCECodeVerifier();
        const code_challenge = await oidc.calculatePKCECodeChallenge(code_verifier);
        const state = oidc.randomState();
        
        let parameters = {
            redirect_uri: process.env.COGNITO_CALLBACK_URL,
            code_challenge,
            code_challenge_method: 'S256',
            state
        };
        
        const congnitoLoginURL = oidc.buildAuthorizationUrl(config, parameters).href;

        res.cookie('state', state, { httpOnly: true, signed: true, sameSite: 'None',secure: true });
        res.cookie('code_verifier', code_verifier, { httpOnly: true, signed: true, sameSite: 'None',secure: true });
        res.send(JSON.stringify({ congnitoLoginURL }));
    } catch (err) {
        console.error("Error in /login:", err);
        res.status(500).send({ error: err.message });
    }
});

app.get('/token', async (req, res) => {
    try {
        console.log("token sended");

        const { state, code_verifier } = req.signedCookies;

        console.log("state : "+state);
        console.log("code_verifier : "+code_verifier);
        console.log("config : "+config);
        console.log("currectUrl : "+getCurrentUrl(req));

        
        let tokens = await oidc.authorizationCodeGrant(
            config,
            getCurrentUrl(req),
            {
                pkceCodeVerifier: code_verifier,
                expectedState: state,
            }
        );
        
        res.cookie('ACCESS_TOKEN', tokens.access_token, { httpOnly: true, signed: true, sameSite: 'None',secure: true });
        res.cookie('REFRESH_TOKEN', tokens.refresh_token, { httpOnly: true, signed: true, sameSite: 'None',secure: true });
        res.cookie('ID_TOKEN', tokens.id_token);
        res.clearCookie("state");
        res.clearCookie("code_verifier");
        res.send(tokens);
    }
    catch (err) {
        console.error("Error in /token:", err);
        res.status(500).send({ error: err.message });
    }
});

app.get('/logout', (req, res) => {
    // Clear authentication-related cookies
    res.clearCookie('ACCESS_TOKEN');
    res.clearCookie('REFRESH_TOKEN');
    res.clearCookie('ID_TOKEN');
    res.clearCookie('state');
    res.clearCookie('code_verifier');

    // Redirect user to Cognito logout endpoint
    const logoutUrl = `https://${process.env.AWS_COGNITO_DOMAIN}/logout?client_id=${process.env.COGNITO_CLIENT_ID}&logout_uri=${encodeURIComponent(process.env.LOGOUT_REDIRECT_URI)}`;
    //console.log(`https://${process.env.AWS_COGNITO_DOMAIN}/logout?client_id=${process.env.COGNITO_CLIENT_ID}&logout_uri=${encodeURIComponent(process.env.LOGOUT_REDIRECT_URI)}`);
    
    res.redirect(logoutUrl);
});

app.get('/auth/check', (req, res) => {
    //console.log("/auth/check");

    try {
        // Check if the ID_TOKEN cookie is present and signed correctly
        const idToken = req.signedCookies.ID_TOKEN || req.cookies.ID_TOKEN; // Check both signed and non-signed

        //console.log("ID Token:", idToken);

        if (!idToken) return res.status(401).send({ authenticated: false });

        // Decode payload without verifying
        const payload = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString('utf8'));

        //console.log("Decoded Payload:", payload);

        res.send({ authenticated: true, user: { email: payload.email, username: payload['cognito:username'] } });
    } catch (err) {
        console.error("Auth check error:", err);
        res.status(401).send({ authenticated: false });
    }
});

app.post('/upload-pdf', upload.single('pdf'), (req, res) => {
    //console.log("uploading pdf");
    
    const fileUrl = `https://${process.env.BUCKETS_NAME}.s3.${process.env.REGION}.amazonaws.com/${req.file.key}`;
    res.status(200).json({ fileUrl });
});

app.get('/folder', async (req, res) => {
    const foldername = req.query.foldername;
    //console.log("show sub-folder " + foldername);
    
    if (!foldername) return res.status(400).json({ error: "Missing foldername" });

    try {
        const command = new ListObjectsV2Command({
            Bucket: process.env.BUCKETS_NAME,
            Prefix: `${foldername}/`,
            Delimiter: '/'
        });

        const response = await s3.send(command);

        const subfolders = response.CommonPrefixes?.map(prefix => prefix.Prefix) || [];
        res.json({ subfolders });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/file', async (req, res) => {
    const subfolder = req.query.subfolder;
    if (!subfolder) return res.status(400).json({ error: "Missing subfolder" });

    try {
        const command = new ListObjectsV2Command({
            Bucket: process.env.BUCKETS_NAME,
            Prefix: `${subfolder}/`
        });

        const response = await s3.send(command);

        const files = response.Contents
            .filter(obj => !obj.Key.endsWith('/'))
            .map(obj => ({
                key: obj.Key,
                url: `https://${process.env.BUCKETS_NAME}.s3.${process.env.REGION}.amazonaws.com/${obj.Key}`
            }));

        res.json({ files });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

initializeServer()
  .then(() => {
    app.listen(port, () => {
      console.log("Server Started on port " + port);
    });
  })
  .catch(error => {
    console.error("Failed to initialize server:", error);
    process.exit(1);
  });

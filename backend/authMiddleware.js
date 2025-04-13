const { verfiyJWT } = require("./utils");

const excludeAuthURLs = new Set(['/login', '/token','/auth/check','/folder','/file','/upload-pdf']) //unauthenticated

const authMiddleware = async (req, res, next) => {
    if (excludeAuthURLs.has(req.path)) {
        console.log("Bypassing JWT verification for" + req.path);
        next();
        return;
    }

    const { ACCESS_TOKEN: accessToken } = req.signedCookies;
    if (verfiyJWT(accessToken, jwtSigningKey)) next();//if valid next routh
    else res.status(401).send("Unauthenticated");//if token unvalid send
}

module.exports = authMiddleware;
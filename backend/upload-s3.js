const multer = require("multer");
const s3 = require("./client.js");
const multerS3 = require('multer-s3');
const HttpException = require('./HttpException.js');

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new HttpException(400, 'Invalid file type'), false);
    }
};

const storage = multerS3({
    s3,
    bucket: process.env.BUCKETS_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
        const folder = req.query.folder;
        if (!folder) {
            return cb(new HttpException(400, 'Missing folder query parameter'), null);
        }
        const prefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${folder}/${prefix}-${file.originalname}`);
    }
});

module.exports = multer({ storage, fileFilter });

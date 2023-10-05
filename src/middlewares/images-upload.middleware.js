const multer = require('multer');
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

const MIME_TYPE_MAP = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'video/mp4': 'mp4',
    'model/gltf-binary': 'gltf',
    'model/gltf+json': 'gltf'
    
};

const fileUpload = (folder="uploads/images") => multer({
    limits: {fileSize: parseInt(process.env.DEFAULT_MAXFILE_SIZE) || 104857600},
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const dpath = path.join(folder);
            fs.mkdirSync(dpath, { recursive: true });
            cb(null, dpath);
        },
        filename: (req, file, cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, uuid.v1() + '.' + ext);
        },
    }),
    fileFilter: (rq, file, cb) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype];
        if(!isValid) {
            cb(null, false);
            return cb(new Error('Invalid upload: field name should be image and image/jpeg, image/jpg format '));
        }
        
        cb(null, true);
        
    },
});

module.exports = fileUpload;
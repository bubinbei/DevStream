const express = require('express');
const router = express.Router();
const multer = require('multer');

const uploadDestination = 'uploads'
// место хранения файлов
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

/* GET home page. */
router.get('/register', function(req, res, next) {
    res.send('register');
});

module.exports = router;
const express = require('express');
const { uploadDocuments } = require('../controllers/documentController');
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post(
    '/upload',
    authMiddleware,
    upload.fields([
        { name: 'aadharFront', maxCount: 1 },
        { name: 'aadharBack', maxCount: 1 },
        { name: 'voterFront', maxCount: 1 },
        { name: 'voterBack', maxCount: 1 },
        { name: 'panCard', maxCount: 1 },
        { name: 'fssaiPhoto', maxCount: 1 },
    ]),
    uploadDocuments
);

module.exports = router;

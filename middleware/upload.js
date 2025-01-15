const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Define storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files in the `uploads` folder
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${uuidv4()}${ext}`); // Generate unique file names
    },
});


const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/products/'); // Save files in the `uploads/products` folder
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${uuidv4()}${ext}`); // Generate unique file names
    },
});


// File filter for images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};


// File filter for images
const productFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};

// Create upload instance
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 }, // 5 MB limit
});


// Create product upload instance
const productUpload = multer({
    storage: productStorage,
    fileFilter: productFileFilter,
    limits: { fileSize: 50 * 1024 * 1024 }, // 5 MB limit
});


module.exports = { upload, productUpload };

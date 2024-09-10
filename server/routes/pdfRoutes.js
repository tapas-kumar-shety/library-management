// const express = require('express');
// const router = express.Router();
// const pdfController = require('../controllers/pdfController');
// const requireLogin = require('../authMdlwr'); // Middleware to check authentication

// // Route for uploading PDFs (only authenticated users can upload)
// router.get('/upload', requireLogin, pdfController.renderUploadForm);
// router.post('/upload', requireLogin, pdfController.uploadPDF);

// // Route for displaying all uploaded PDFs
// router.get('/', pdfController.getAllPDFs);

// // Route for serving individual PDF files
// router.get('/:filename', pdfController.servePDF);

// module.exports = router;

const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');
const requireLogin = require('../../authMdlwr'); // Middleware for authentication

// Route to upload PDF (for authenticated users)
router.get('/upload', requireLogin, pdfController.renderUploadForm);
router.post('/upload', requireLogin, pdfController.uploadPDF);

// Route to get all PDFs
router.get('/', pdfController.getAllPDFs);

// Route to serve individual PDFs
router.get('/:filename', pdfController.servePDF);

module.exports = router;

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

/**
 *  Student Routes 
*/

// router.get('/', studentController.default);
router.get('/', studentController.default); // Default page route

router.get('/dash', studentController.homepage);
router.get('/about', studentController.about);
router.get('/add', studentController.addStudent);
router.post('/add', studentController.postStudent);
router.get('/view/:id', studentController.view);
router.get('/edit/:id', studentController.edit);
router.put('/edit/:id', studentController.editPost);
router.delete('/edit/:id', studentController.deleteStudent);

router.post('/search', studentController.searchStudents);

module.exports = router;

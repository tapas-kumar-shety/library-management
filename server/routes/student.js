const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const requirelogin = require('../../authMdlwr')


/**
 *  Student Routes 
*/



router.get('/',studentController.default); // Default page route

router.get('/dash', studentController.homepage);
router.get('/about', studentController.about);
router.get('/add',requirelogin, studentController.addStudent);
router.post('/add', studentController.postStudent);
router.get('/view/:id',studentController.view);
router.get('/edit/:id',requirelogin, studentController.edit);
router.put('/edit/:id', studentController.editPost);
router.delete('/edit/:id',requirelogin,studentController.deleteStudent);

router.post('/search', studentController.searchStudents);

module.exports = router;

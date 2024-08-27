const Student = require("../models/Student");  //// importing the schema from model/student..
const mongoose = require("mongoose");

// // get default page

exports.default = async (req, res) => {
  const locals = {
    title: "Default Page",
    description: "Welcome to the default page",
  };

  res.render("default", {
    layout: 'layouts/defaultLay', 
    locals
  });
};

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
  const locals = {
    title: "NodeJs",
    description: "Free NodeJs Student Management System",
  };

  let perPage = 6;
  let page = req.query.page || 1;

  try {
    const students = await Student.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Student.countDocuments({});

    res.render("index", {
      locals,
      students,
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * About
 */
exports.about = async (req, res) => {
  const locals = {
    title: "About",
    description: "Free NodeJs Student Management System",
  };

  try {
    res.render("about", { 
      layout: 'layouts/defaultLay', 
      locals
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * New Student Form
 */
exports.addStudent = async (req, res) => {
  const locals = {
    title: "Add New Student - NodeJs",
    description: "Free NodeJs Student Management System",
  };

  res.render("student/add", locals);
};

/**
 * POST /
 * Create New Student
 */
exports.postStudent = async (req, res) => {
  console.log(req.body);

  const newStudent = new Student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    details: req.body.details,
    tel: req.body.tel,
    email: req.body.email,
  });

  try {
    await Student.create(newStudent);
    res.redirect("/dash");
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Student Data
 */
exports.view = async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.id });

    const locals = {
      title: "View Student Data",
      description: "Free NodeJs Student Management System",
    };

    res.render("student/view", {
      locals,
      student,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Edit Student Data
 */
exports.edit = async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.id });

    const locals = {
      title: "Edit Student Data",
      description: "Free NodeJs Student Management System",
    };

    res.render("student/edit", {
      locals,
      student,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Update Student Data
 */
exports.editPost = async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
      updatedAt: Date.now(),
    });
    await res.redirect(`/edit/${req.params.id}`);

    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete /
 * Delete Student Data
 */
exports.deleteStudent = async (req, res) => {
  try {
    await Student.deleteOne({ _id: req.params.id });
    res.redirect("/dash");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get /
 * Search Student Data
 */
exports.searchStudents = async (req, res) => {
  const locals = {
    title: "Search Student Data",
    description: "Free NodeJs Student Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const students = await Student.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      students,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};

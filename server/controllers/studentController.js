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
    title: "Library management system",
    description: "Student Management System",
  };

  let perPage = 7;
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
    title: "Add New Student",
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
 
    Name: req.body.Name || "Unknown Name",        
    year: req.body.year || "N/A",                 
    details: req.body.details || "No details",    
    reg: req.body.reg || "Not Registered",      
    email: req.body.email || "noemail@example.com",
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
      description: " library Management System",
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
      description: " library Management System",
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
      Name: req.body.Name,
      year: req.body.year,
      reg: req.body.reg,
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
        { Name: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { year: { $regex: new RegExp(searchNoSpecialChar, "i") } },
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


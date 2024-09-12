// const { default: mongoose } = require("mongoose");

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const StudentSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  reg: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Student', StudentSchema);

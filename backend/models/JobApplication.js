const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  education: String,
  experience: String,
  position: String,
  resumePath: String // This can store the file path if uploading resumes
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);

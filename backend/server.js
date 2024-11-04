// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Import path module
const multer = require('multer'); // Import multer for file uploads

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
const dbURI = 'mongodb://localhost:27017/jobApplications';
mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Configure multer for file upload handling
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Store files in an 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Save with a unique timestamp
  }
});

const upload = multer({ storage: storage });

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html')); // Path to views directory
});

// Mongoose model for job applications
const JobApplication = mongoose.model('JobApplication', new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    education: String,
    experience: String,
    position: String,
    resumePath: String // To store the file path of the uploaded resume
}));

// Route to handle form submission with file upload
app.post('/submit', upload.single('resume'), async (req, res) => {
    const { name, email, phone, education, experience, position } = req.body;
    const resumePath = req.file ? req.file.path : null; // Save file path if file exists

    const newJobApplication = new JobApplication({
        name,
        email,
        phone,
        education,
        experience,
        position,
        resumePath
    });

    try {
        await newJobApplication.save();
        res.json({ message: 'Form submission received', name, email });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Error saving data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

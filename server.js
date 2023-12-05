// Importing necessary dependencies
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const fs = require("fs");
const msRest = require("@azure/ms-rest-js");
const axios = require("axios");
const FormData = require("form-data");
// const { PredictionAPIClient } = require("@azure/cognitiveservices-customvision-prediction");

dotenv.config();

// Assign env variables
const VISION_PREDICTION_KEY = process.env["VISION_PREDICTION_KEY"];
const VISION_PREDICTION_RESOURCE_ID =
  process.env["VISION_PREDICTION_RESOURCE_ID"];
const VISION_PREDICTION_ENDPOINT = process.env["VISION_PREDICTION_ENDPOINT"];
const PROJECT_ID = process.env["PROJECT_ID"];
const PORT = process.env["PORT"];

// Create an instance of the Express application
const app = express();

// Enable CORS to allow requests from a specific origin
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Multer storage configuration for handling file uploads
const storageEngine = multer.diskStorage({
  destination: "./images", // Destination directory for storing uploaded images
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`); // Generate a unique filename for each uploaded image
  },
});

// Multer configuration using the storage engine, setting file size limits, and adding a file filter
const upload = multer({
  storage: storageEngine,
  limits: { fileSize: 10000000 }, // Limit the file size to 10 MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb); // Call the file type check function
  },
});

// Importing the path module for handling file paths
const path = require("path");

// Function to check if the uploaded file has a valid image type
const checkFileType = function (file, cb) {
  const fileTypes = /jpeg|jpg|png|gif|svg/; // Allowed image file types

  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true); // File type is valid
  } else {
    cb("Error: You can Only Upload Images!!"); // File type is not valid
  }
};

// Route to handle HTTP POST requests for single image uploads
app.post("/uploadsingleimage", upload.single("image"), async (req, res) => {
  console.log("Received image", req.body);

  // uploads and processes the image on the server side/custom vision
  try {
    const formData = new FormData();
    formData.append("image", fs.createReadStream(req.file.path));

    const response = await axios.post(
      process.env.VISION_PREDICTION_ENDPOINT,
      formData,
      {
        headers: {
          "Prediction-Key": process.env.VISION_PREDICTION_KEY,
          ...formData.getHeaders(),
        },
      }
    );

    const responseData = response.data;
    res.json(responseData);
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Set the server to listen on port 4000

app.listen(PORT || 4000, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

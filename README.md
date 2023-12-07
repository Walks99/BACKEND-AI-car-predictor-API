# BACKEND AI car predictor API and database

**Table of Contents**

- [Overview](#overview)

- [How it works](#how-it-works)

- Dependencies
    - [Frontend](#frontend-dependencies)
    - [Backend](#backend-dependencies)

- [How to run](#how-to-run)

- [Author and contact info](#author-and-contact-info)

- [License](#license)

## Overview

The complete program constitutes a simple full-stack application for uploading an image of a car, which is then analyzed by an AI model (Azure Custome Vision) from Microsoft's cognitive services. The model’s prediction results are then used to query a MongoDB database and retrieve similar cars which are then displayed to the user. 

<p align="right">(<a href="#backend-ai-car-predictor-api-and-database">back to top</a>)</p>

## How it works

1. **App Initialization (Frontend):** 
    - The React frontend begins by importing necessary dependencies and setting up the `App` component, which includes state management for the retrieved data using the `useState` hook. The component also defines a function, `uploadImageViaHttpPostRequest`, to handle image uploads via HTTP POST requests.

2. **Image Upload Form (Frontend):** 
    - The `App` component renders a form with a file input allowing users to select an image file. The form includes an `onSubmit` event that triggers the `uploadImageViaHttpPostRequest` function when the user attempts to submit the form.

3. **Image Upload Request (Frontend):** 
    - Inside the `uploadImageViaHttpPostRequest` function, the selected image file is obtained, and a `FormData` object is created to store the image file. Using the Fetch API, an HTTP POST request is made to the server endpoint `http://localhost:4000/uploadsingleimage` with the image file attached in the request body.

4. **Server Configuration (Backend):** 
    - The Express server is created and configured with necessary middleware such as, `cors` to handle JSON requests and enable Cross-Origin Resource Sharing, `multer` to manage file uploads, and `mongoose` to establised a connection the local MongoDB database. The server is set to listen on port 4000.

5. **Multer Configuration (Backend):** 
    - Multer is configured with a storage engine to specify the destination directory for storing uploaded images and to generate unique filenames. Additionally, file size limits and a file filter function (`checkFileType`) are set to ensure the uploaded file is a valid image type.

6. **File Type Validation (Backend):** 
    - The `checkFileType` function is employed to verify whether the uploaded file has a valid image type based on allowed extensions and MIME types. If the file type is valid, the server continues processing; otherwise, it responds with a 400 status and an error message.

7. **Endpoint actions (Backend):** 
    - The server sets up a route `/uploadsingleimage` that handles HTTP POST requests for single image uploads using the configured Multer middleware. Upon receiving a valid image, an axios request is made to the Azure customer vision AI model for prediction. Logic is then used to extract the highest probable car type from the model's prediction. A query is then made to the MongoDB database to retrieve all matching cars. The matched data is then sent back to the frontend react app for dynamic rendering on the webpage.

8. **Handling Responses (Frontend):** 
    - Back on the React frontend, the received data is stored as an Array in a state-variable. Within the return statement of the `APP` component, the stored data is mapped through and displayed dynamically to the end user.


<p align="right">(<a href="#backend-ai-car-predictor-api-and-database">back to top</a>)</p>

## Dependencies

### *Frontend Dependencies*

#### React:

- A JavaScript library for building user interfaces.
- Allows developers to create reusable UI components.
- Manages the state of components and efficiently updates the DOM.

### *Backend Dependencies*

#### Node.js:

- A JavaScript runtime built on Chrome's V8 JavaScript engine.
- Allows running JavaScript code on the server-side.
- Powers the backend server.

#### Express:

- A minimal and flexible Node.js web application framework.
- Simplifies the process of building robust and scalable web applications.
- Handles routing, middleware, and HTTP request/response processing.

#### Cors Middleware:

- The cors middleware is used to enable Cross-Origin Resource Sharing.
- Allows the backend to respond to requests from a different origin (in this case, the frontend).
- Configured with options specifying the allowed origin and credentials.

#### Multer Middleware:

- The multer middleware is designed to handle file uploads.
- It facilitates the processing of multipart/form-data, commonly used when uploading files through HTML forms.
- Allows developers to configure various options, including the destination directory for storing uploaded files, defining filename generation strategies, setting file size limits, and implementing custom file filters for validation.

#### Axios

- Axios facilitates the request to the Azure custom Vision API
- provides a simple and expressive way to make HTTP requests, abstracting away the complexities of the underlying XMLHttpRequest or the Fetch API.
- Axios leverages a promise-based workflow, making it easy to handle asynchronous operations and enabling clean and concise error handling and chaining of multiple requests.

#### Mongoose

- Establishes a connection to the MongoDB database.
- Mongoose serves as middleware for MongoDB, enabling schema-based validation to ensure that data conforms to predefined structures before interacting with the database.
- Simplifies interactions with MongoDB by providing a structured way to model data, reducing boilerplate code and enhancing code organization.



<p align="right">(<a href="#backend-ai-car-predictor-api-and-database">back to top</a>)</p>

## How to Run

1. **Clone the backend repository:**
   ```
   git clone https://github.com/Walks99/BACKEND-AI-car-predictor-API.git
   ```

2. **Install backend dependencies**
    ```
    npm install
    ```

4. **Start the backend server**
    ```
    npm run node
    ```
    *or*
    ```
    npm run nodemon
    ```

5. **Clone the frontend repository**
    ```
    git clone https://github.com/Walks99/FRONTEND-AI-car-predictor-API
    ```

6. **Install frontend dependencies**
    ```
    npm install
    ```

7. **start frontend server**
    ```
    npm start
    ```

8. **Access the application at**
    ```
    http://localhost:3000
    ```

<p align="right">(<a href="#backend-ai-car-predictor-api-and-database">back to top</a>)</p>

## Author and contact info

##### *Ben Walker*

  - Email: **benwalker1.personal@gmail.com**
  - Github: **Walks99**

### License

This project is licensed under the ISC License.

Copyright (c) [2023], [Ben Walker - Walks99]

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

<p align="right">(<a href="#backend-ai-car-predictor-api-and-database">back to top</a>)</p>
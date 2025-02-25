Image Processing API

This project is an image processing API that allows users to upload a CSV file containing image URLs, process the images (compressing them by 50% using Jimp), and retrieve the status of processed images.

Features

Upload a CSV file with product names and image URLs

Process images using Jimp (compressed to 50%)

Store image processing requests in a MySQL database

Retrieve processing status and output image URLs

Send webhook notifications upon completion

Project Structure

.
├── controllers
│   ├── imageController.js  # Handle CSV upload, image processing
│   ├── statusController.js # Check status of processing
│   └── webhookService.js   # Handle webhook notifications
├── models
│   ├── db.js               # DB connection
│   └── imageModel.js       # Product and request models
├── routes
│   ├── imageRoutes.js      # Routes for image processing
│   └── statusRoutes.js     # Routes for status checks
├── server.js               # Express server setup

Setup

Clone the repository:

git clone <repository-url>
cd <repository-folder>

Install dependencies:

npm install

Set up MySQL database and configure .env file:

MYSQL_HOST=<your-mysql-host>
MYSQL_USER=<your-mysql-user>
MYSQL_PASSWORD=<your-mysql-password>
MYSQL_DATABASE=<your-mysql-database>
MYSQL_PORT=<your-mysql-port>

Start the server:

node server.js

API Endpoints

Upload CSV and Process Images

Endpoint: POST /api/images/upload

Request: Multipart form data with csv file and optional webhookUrl

Response: JSON { requestId }

Check Processing Status

Endpoint: GET /api/status/:id

Response: JSON { status, outputImageUrls }

Image Processing

Images are processed using Jimp, with a quality setting of 50% compression to reduce file size while maintaining quality.

Processed images are stored and referenced in the database.

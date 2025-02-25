# Image Processing API

## Overview
This API allows users to upload a CSV file containing product names and image URLs. The system processes these images, compresses them to 50% quality using Jimp, stores them in a database, and provides a status-check endpoint.

## Features
- CSV-based batch image processing
- Image compression (50% quality) using Jimp
- Status tracking via API
- Webhook notifications upon completion

## Project Structure
```
.
├── controllers
│   ├── imageController.js  # Handle CSV upload, image processing
│   ├── statusController.js # Check status of processing
│   └── webhookService.js   # Webhook notification handler
├── models
│   ├── db.js               # DB connection
│   └── imageModel.js       # Product and request models
├── routes
│   ├── imageRoutes.js      # Routes for image processing
│   └── statusRoutes.js     # Routes for status checks
├── server.js               # Express server setup
├── .env.example            # Environment variable sample
├── package.json            # Node dependencies
└── README.md               # Documentation
```

## Setup Instructions

### 1. Clone the Repository
```sh
git clone <your-repo-url>
cd <your-project-folder>
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and define your MySQL database credentials as shown in `.env.example`.

### 4. Start the Server
```sh
node server.js
```
The server will run on `http://localhost:3000`.

## API Endpoints

### **Upload CSV and Process Images**
**Endpoint:** `POST /api/images/upload`  
**Payload:** Multipart form data with CSV file and optional `webhookUrl`  
**Response:**
```json
{
  "requestId": "generated-request-id"
}
```

### **Check Processing Status**
**Endpoint:** `GET /api/status/:id`  
**Response:**
```json
{
  "status": "COMPLETED",
  "outputImageUrls": ["url1", "url2"]
}
```

### **Image Processing**

Images are processed using Jimp, with a quality setting of 50% compression to reduce file size while maintaining quality.

Processed images are stored and referenced in the database.

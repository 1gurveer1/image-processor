const express = require('express');
const multer = require('multer');
const imageRoutes = require('./routes/imageRoutes');
const statusRoutes = require('./routes/statusRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Multer setup for file upload
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/images', upload.single('csv'), imageRoutes);
app.use('/api/status', statusRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


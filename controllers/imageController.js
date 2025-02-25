const csv = require('csv-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { saveProduct, updateProductStatus } = require('../models/imageModel');
const { sendWebhookNotification } = require('../controllers/webhookService');
const { Jimp } = require('jimp');

exports.uploadCSV = (req, res) => {
    const filePath = req.file.path;
    const requestId = uuidv4();
    const webhookUrl = req.body.webhookUrl;

    const products = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            const productName = row['Product Name'];
            const inputImageUrls = row['Input Image Urls'];
            products.push({ productName, inputImageUrls });
        })
        .on('end', async () => {
            try {
                // Use Promise.all to wait for all products to be saved
                await Promise.all(products.map(product => 
                    new Promise((resolve, reject) => {
                        saveProduct(product.productName, product.inputImageUrls, requestId, webhookUrl, (err, productId) => {
                            if (err) return reject(err);

                            processImages(product.inputImageUrls.split(', '), (outputImageUrls) => {
                                updateProductStatus(productId, 'COMPLETED', outputImageUrls.join(', '), (err) => {
                                    if (err) console.error('Error updating product status');

                                    sendWebhookNotification(webhookUrl, requestId, 'COMPLETED', outputImageUrls);
                                    resolve();
                                });
                            });
                        });
                    })
                ));

                // Send response only once after all products are processed
                res.json({ requestId });

            } catch (error) {
                console.error('Error processing CSV:', error);
                res.status(500).send('Error processing CSV file');
            }
        });
};


function processImages(imageUrls, callback) {
    Promise.all(imageUrls.map((url, index) => {
        return Jimp.read(url)
            .then(image => {
                const outputPath = path.join(__dirname, `output-${index}.jpg`);
                return image
                    .quality(50) // Set quality to 50%
                    .writeAsync(outputPath) // Save image
                    .then(() => outputPath); // Return path after saving
            })
            .catch(err => {
                console.error('Error processing image:', err);
                return null; // Return null for failed images
            });
    }))
    .then(results => {
        const validResults = results.filter(path => path !== null);
        callback(validResults); // Pass valid image paths to callback
    });
}

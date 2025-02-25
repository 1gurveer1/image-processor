const db = require('./db');

// Save a new product and request
exports.saveProduct = (productName, inputImageUrls, requestId, webhookUrl, callback) => {
    db.query(
        'INSERT INTO products (product_name, input_image_urls, status) VALUES (?, ?, ?)',
        [productName, inputImageUrls, 'PENDING'],
        (err, result) => {
            if (err) return callback(err);
            const productId = result.insertId;

            db.query(
                'INSERT INTO requests (request_id, product_id, status, webhook_url) VALUES (?, ?, ?, ?)',
                [requestId, productId, 'PENDING', webhookUrl],
                (err) => {
                    callback(err, productId);
                }
            );
        }
    );
};

// Update product status
exports.updateProductStatus = (productId, status, outputImageUrls, callback) => {
    db.query(
        'UPDATE products SET status = ?, output_image_urls = ? WHERE id = ?',
        [status, outputImageUrls, productId],
        callback
    );
};

// Fetch product status by request ID
exports.getStatusByRequestId = (requestId, callback) => {
    db.query(
        'SELECT p.status, p.output_image_urls FROM products p JOIN requests r ON p.id = r.product_id WHERE r.request_id = ?',
        [requestId],
        callback
    );
};

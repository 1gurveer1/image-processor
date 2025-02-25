const { getStatusByRequestId } = require('../models/imageModel');

exports.checkStatus = (req, res) => {
    const requestId = req.params.id;
    
    getStatusByRequestId(requestId, (err, result) => {
        if (err) return res.status(500).send('Error fetching status');
        
        if (result.length === 0) {
            return res.status(404).send('Request not found');
        }
        
        const status = result[0].status;
        const outputImageUrls = result[0].output_image_urls;
        
        res.json({ status, outputImageUrls });
    });
};

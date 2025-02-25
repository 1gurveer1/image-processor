const axios = require('axios');

exports.sendWebhookNotification = async (webhookUrl, requestId, status, outputImageUrls) => {
    if (!webhookUrl) {
        console.warn(`No webhook URL provided for request ${requestId}, skipping notification.`);
        return;
    }

    try {
        await axios.post(webhookUrl, {
            requestId,
            status,
            outputImageUrls
        });
        console.log(`Webhook sent successfully for request ${requestId}`);
    } catch (error) {
        console.error(`Error sending webhook for request ${requestId}:`, error.message);
    }
};

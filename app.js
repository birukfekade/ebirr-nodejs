const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.post('/submit-data', async (req, res) => {
console.log('hit');
    try {
        
        const apiUrl = 'https://testpayments.ebirr.com/asm';
        const phone = req.body.phone;
        const amount = req.body.amount;
        const requestData = {

            "schemaVersion": "1.0",
            "requestId": "RjEV1zQ0lTbA4oe7g",
            "timestamp": "RjEV1zQ0lTbA4oe7g",
            "channelName": "WEB",
            "serviceName": "API_PURCHASE",
            "serviceParams": {
                "merchantUid": "M1040033",
                "paymentMethod": "MWALLET_ACCOUNT",
                "apiKey": "API-10618773",
                "apiUserId": "10000008",
                "payerInfo": {
                    "accountNo": phone
                },
                "transactionInfo": {
                    "amount": amount,
                    "currency": "ETB",
                    "description": "description",
                    "referenceId": "RjEV1zQ01lTbAs4oe7g",
                    "invoiceId": "IjEV1zQ0l1TbA4soe7g"
                }
            }
        };

        // Make an HTTP POST request using axios
        const response = await axios.post(apiUrl, requestData);

        // Assuming the API returns JSON data, you can directly send it in the response
        res.json(response.data);
    } catch (error) {
        // In case of an error, handle it appropriately
        console.error('Error submitting data:', error.message);
        res.status(500).json({ error: 'Failed to submit data' });
    }
});


app.listen(port, () => console.log(`Express app running on port ${port}!`));
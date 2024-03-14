const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const axios = require('axios');

const whatsapp = new Client({
    authStrategy: new LocalAuth()
});

whatsapp.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

whatsapp.on('message', async (message) => {
    if (message.body.toLowerCase().startsWith("hey bot")) {
        const userMessage = message.body.substring(7).trim(); 
        console.log("Received message:", userMessage); 
        
     
        try {
            const response = await axios.post('http://localhost:3000/genai', {
                userMessage: userMessage
            });
            const genaiResponse = response.data;
            console.log('Received response from genai.js:', genaiResponse);
            message.reply(genaiResponse); 
        } catch (error) {
            console.error('Error sending message to genai.js:', error.message);
        }
    }
});

whatsapp.on('ready', () => {
    console.log('Client is ready!');
});

whatsapp.initialize();

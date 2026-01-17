// ========== 1. SETUP MULTER FOR FILE UPLOADS ==========
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Store file in memory
const FormData = require('form-data'); // You'll need this: run `npm install form-data`

// ========== 2. ENDPOINT: UPLOAD TO WHATSAPP SERVERS ==========
// This endpoint receives a file and forwards it to WhatsApp's API
app.post('/upload-media', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // Prepare the file for WhatsApp
    const form = new FormData();
    form.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype
    });
    form.append('type', file.mimetype);
    form.append('messaging_product', 'whatsapp');

    // Upload to WhatsApp Cloud API
    const uploadResponse = await fetch(`https://graph.facebook.com/v18.0/${YOUR_PHONE_NUMBER_ID}/media`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${YOUR_PERMANENT_ACCESS_TOKEN}`,
      },
      body: form
    });
    const result = await uploadResponse.json();

    // WhatsApp responds with a Media ID. Store this ID linked to the user's pair code/number.
    // For simplicity, we'll return it. In production, store it in your database.
    res.json({ 
      success: true, 
      mediaId: result.id,
      message: 'File uploaded to WhatsApp. Use !sendimage command to receive it.'
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed.' });
  }
});// ========== 1. SETUP MULTER FOR FILE UPLOADS ==========
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Store file in memory
const FormData = require('form-data'); // You'll need this: run `npm install form-data`

// ========== 2. ENDPOINT: UPLOAD TO WHATSAPP SERVERS ==========
// This endpoint receives a file and forwards it to WhatsApp's API
app.post('/upload-media', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // Prepare the file for WhatsApp
    const form = new FormData();
    form.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype
    });
    form.append('type', file.mimetype);
    form.append('messaging_product', 'whatsapp');
 (error) {
  

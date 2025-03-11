const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Disable caching for HTML files
app.use((req, res, next) => {
    if (req.path.endsWith('.html') || req.path === '/') {
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
    }
    next();
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Autodetect route
app.get('/autodetect', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'autodetect.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

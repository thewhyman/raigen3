const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Log all requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Disable all caching
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
});

// Default route with explicit file reading
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    console.log('Serving index.html from:', indexPath);
    
    // Read and serve the file directly
    fs.readFile(indexPath, 'utf8', (err, content) => {
        if (err) {
            console.error('Error reading index.html:', err);
            return res.status(500).send('Error reading index.html');
        }
        res.type('html').send(content);
    });
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public'), {
    etag: false,
    lastModified: false
}));

// Autodetect route
app.get('/autodetect', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'autodetect.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

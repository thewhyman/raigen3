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
    const therapyPath = path.join(__dirname, 'public', 'therapy.html');
    console.log('Serving therapy.html from:', therapyPath);
    
    // Read and serve the file directly
    fs.readFile(therapyPath, 'utf8', (err, content) => {
        if (err) {
            console.error('Error reading therapy.html:', err);
            return res.status(500).send('Error reading therapy.html');
        }
        res.type('html').send(content);
    });
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public'), {
    etag: false,
    lastModified: false
}));

// Redirect any old routes to the main page
app.get(['/autodetect', '/avatar', '/index'], (req, res) => {
    res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

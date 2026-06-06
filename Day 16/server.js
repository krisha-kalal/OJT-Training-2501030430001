const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Serve CSS/JS files

let users = [];

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // 1. Backend Validation
    if (!username || username.length < 3) return res.status(400).json({ error: 'Username must be at least 3 characters.' });
    if (!email.includes('@')) return res.status(400).json({ error: 'Invalid email format.' });
    if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters.' });

    // 2. Prevent Duplicates
    if (users.find(u => u.email === email)) {
        return res.status(409).json({ error: 'Email already registered.' });
    }

    // 3. Save User (Note: In production, NEVER save plain-text passwords. Use bcrypt!)
    users.push({ username, email, password }); 
    res.status(201).json({ message: 'Registration successful!' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
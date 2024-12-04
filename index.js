const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 4000;

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// MongoDB connection URI (adjust as needed)
const mongoURI = 'mongodb://localhost:27017/blue';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Define Mongoose Schema and Model
const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    created_at: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

// Routes

// Serve static HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/Home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '/about.html'));
});

// Get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Add a new user
app.post('/api/users', async (req, res) => {
    const { first_name, last_name, email } = req.body;

    try {
        const newUser = new User({ first_name, last_name, email });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Get a single user by ID
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// Update a user by ID (not implemented in full, just a placeholder)
app.put('/api/users/:id', (req, res) => {
    res.json({ status: 'pending' });
});

// Delete a user by ID (not implemented in full, just a placeholder)
app.delete('/api/users/:id', (req, res) => {
    res.json({ status: 'pending' });
});

// Render user list dynamically
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        const html = `
            <ul>
                ${users.map((user) => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
            </ul>
        `;
        res.send(html);
    } catch (err) {
        res.status(500).send('Error loading users.');
    }
});

// Placeholder routes for additional pages
app.get('/gallery', (req, res) => {
    res.send('Gallery Page!');
});

app.get('/content', (req, res) => {
    res.send('Content Page!');
});

app.get('/page', (req, res) => {
    res.send('Page!');
});

// Start the server
app.listen(port, () => console.log(`Server is running on port ${port}`));

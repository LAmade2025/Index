const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const users = [
    { email: 'user@example.com', password: 'password123', name: 'User' }
];

function createLoginInfoRouter() {
    const router = express.Router();

    router.use(bodyParser.urlencoded({ extended: true }));

    router.use(session({
        secret: 'your-secret-key', // Change this to a secure secret key
        resave: false,
        saveUninitialized: true
    }));

    router.get('/auth/login/info', (req, res) => {
        res.render('loginInfo');
    });

    router.post('/auth/login/info', (req, res) => {
        const { email, password } = req.body;

        console.log('Request Body:', req.body);

        const user = users.find(user => user.email === email);

        console.log('Users Array:', users);
        console.log('Search Email:', email);

        console.log('Found User:', user);

        if (user && user.password === password) {
            req.session.user = { email: user.email, name: user.name };

            res.redirect('/video/dashboard');
        } else {
            res.redirect('/auth/login/info?error=Incorrect credentials');
        }
    });

    return router;
}

module.exports = createLoginInfoRouter;

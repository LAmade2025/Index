const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');

function createLoginApp() {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));

    app.set('view engine', 'pug');

    let users = [
        { email: 'user@example.com', name: 'User', password: 'password123' }
    ];

    app.get('/auth/login', (req, res) => {
        res.render('login');
    });

    app.post('/auth/login', (req, res) => {
        const { email, password } = req.body;

        const user = users.find(user => user.email === email);

        if (user && user.password === password) {
            return res.redirect('/video/dashboard');
        } else {
            res.render('login', { error: 'Incorrect Password' });
        }
    });

    return app;
}

module.exports = createLoginApp;

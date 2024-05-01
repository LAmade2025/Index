const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');

function createRegisterApp() {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));

    app.set('view engine', 'pug');

    let users = [];

    app.get('/auth/register', (req, res) => {
        res.render('register');
    });

    app.post('/auth/register', (req, res) => {
        const { email, name, password } = req.body;

        if (!email || !name || !password) {
            return res.render('register', { error: 'Missing information' });
        }

        if (users.find(user => user.email === email)) {
            return res.render('register', { error: 'Email already registered' });
        }

        const newUser = { email, name, password };

        users.push(newUser);

        res.render('account-created');
    });

    app.get('/debug/users', (req, res) => {
        res.json(users);
    });

    return app;
}

module.exports = createRegisterApp;

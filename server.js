const express = require('express');
const session = require('express-session');
const createRegisterApp = require('./register');
const createLoginApp = require('./login');
const createLoginInfoRouter = require('./loginInfo');
const createVideoDashboardRouter = require('./videoDashboard');
const path = require('path');

function startServer() {
    const app = express();

    app.use(session({
        secret: 'your_secret_key_here',
        resave: false,
        saveUninitialized: true
    }));

    app.set('view engine', 'pug');

    app.use(express.static(path.join(__dirname, 'Resources')));

    const registerApp = createRegisterApp();
    app.use(registerApp);

    const loginApp = createLoginApp();
    app.use(loginApp);

    const loginInfoRouter = createLoginInfoRouter();
    app.use(loginInfoRouter);

    const videoDashboardRouter = createVideoDashboardRouter();
    app.use(videoDashboardRouter);

    app.get('/video/dashboard/:videofilter', (req, res) => {
        if (!req.session.user) {
            return res.redirect('/auth/login/info?error=You must log in to access this content');
        }

        const videofilter = req.params.videofilter;

        res.render('video_dashboard', { videofilter });
    });

    app.get('/video/dashboard/all', (req, res) => {
        res.send('Filter for "all" videos');
    });

    app.get('/video/dashboard/mine', (req, res) => {
        res.send('Filter for "mine" videos');
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer();

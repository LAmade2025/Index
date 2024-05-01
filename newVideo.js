const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

let videoEntries = [];

function createNewVideoRouter() {
    const router = express.Router();

    router.use(bodyParser.urlencoded({ extended: true }));

    router.post('/video/new', (req, res) => {
        handleNewVideoSubmission(req, res);
    });

    return router;
}

function handleNewVideoSubmission(req, res) {
    if (!req.session.user) {
        return res.redirect('/auth/login/info?error=You must log in to access this content');
    }

    const { videoUrl, videoTitle } = req.body;

    if (!videoUrl || !videoTitle) {
        return res.redirect('/video/new_video?error=Video URL and title are required');
    }

    const newVideoEntry = {
        videoUrl,
        videoTitle,
        userId: req.session.user.id 
    };

    videoEntries.push(newVideoEntry);

    return res.redirect('/video/new_video?success=Video added successfully');
}

module.exports = createNewVideoRouter;

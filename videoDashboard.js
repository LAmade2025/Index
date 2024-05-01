const express = require('express');

function createVideoDashboardRouter() {
    const router = express.Router();

    router.get('/video/dashboard', (req, res) => {
        if (!req.session.user) {
            return res.render('video_dashboard', { session: null });
        }

        
        res.render('video_dashboard', { session: req.session });
    });

    return router;
}

module.exports = createVideoDashboardRouter;

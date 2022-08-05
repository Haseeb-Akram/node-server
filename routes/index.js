const router = require('express').Router();
const authRoutes = require('./api/AuthRoute');

// Auth Routes
router.use('/auth', authRoutes);


module.exports = router;
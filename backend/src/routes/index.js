const express = require('express');
const router = express.Router();

const userRoutes = require('./user/auth.route');
const adminRoutes = require('./admin/auth.route');

router.use('/user', userRoutes);
router.use('/admin', adminRoutes);

module.exports = router;

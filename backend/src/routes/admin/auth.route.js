const router = require('express').Router();
const adminController = require('../../controllers/index').AdminController;
// const { valid } = require('joi');
const auth = require("../../middleware/auth")

router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);
router.post('/verify-email', adminController.verifyEmail);
router.post('/validate-token',auth, (req,res)=>{
    res.status(200).json({
        status:true,
        valid:true,
        message:"token validate successfully"
    })
});


module.exports = router;

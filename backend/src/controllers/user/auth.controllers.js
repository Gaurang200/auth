const bcrypt = require('bcryptjs');
const User = require('../../models/index').User;
const sendVerificationEmail = require('../../utils/emailVerification');
const { v4: uuidv4 } = require('uuid');
const sault = 10

const registrationSchema = require('../../utils/validationSchema').registrationSchema


exports.registerUser = async (req, res) => {
    const { error } = registrationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { first_name, last_name, email, password } = req.body;
// console.log(req,"req");

    try {
        const hashedPassword = await bcrypt.hash(password, sault);
        const verificationToken = uuidv4();
// console.log(verificationToken,'verificationToken');

        const newUser = {
            first_name,
            last_name,
            email,
            password: hashedPassword,
            role: 'customer',
            verification_token: verificationToken,
        };

        User.findByEmail(email, (err, existingUser) => {
           
            if (existingUser) {
                return res.status(400).json({status:false, error: 'Email already in use.' });
            }
           

        User.create(newUser, (err, data) => {
            if (err) {
                return res.status(500).json({status:false, error: 'Registration failed.' });
            }
            sendVerificationEmail(email, verificationToken);
            res.status(200).json({status:true, message: 'Customer registered. Please verify your email.' });
        });
    })
    } catch (error) {
        res.status(500).json({status:false, error: 'Registration failed.' });
    }
};
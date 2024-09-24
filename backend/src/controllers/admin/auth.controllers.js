const bcrypt = require('bcryptjs');
const Admin = require('../../models/index').User;
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const sendVerificationEmail = require('../../utils/emailVerification');


const registrationSchema = require('../../utils/validationSchema').registrationSchema

const loginSchema = require('../../utils/validationSchema').loginSchema





exports.registerAdmin = async (req, res) => {
    const { error } = registrationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({status:false, error: error.details[0].message });
    }

    const { first_name, last_name, email, password } = req.body;

    // console.log(req.body);
    

    try {
        Admin.findByEmail(email, (err, existingUser) => {
           
            if (existingUser) {
                return res.status(400).json({status:false, error: 'Email already in use.' });
            }
// console.log("existingUser",existingUser);

            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    return res.status(500).json({status:false, error: 'Password hashing failed.' });
                }

                const verificationToken = uuidv4();

                const newAdmin = {
                    first_name,
                    last_name,
                    email,
                    password: hashedPassword,
                    role: 'admin',
                    verification_token: verificationToken,
                };

                Admin.create(newAdmin, (err, data) => {
                    if (err) {
                        // console.log(err,'ee');
                        
                        return res.status(500).json({status:false, error: 'Registration failed.' });
                    }
                    sendVerificationEmail(email, verificationToken);
                    res.status(200).json({status:true, message: 'Admin registered. Please verify your email.' });
                });
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed.' });
    }
};

exports.loginAdmin = async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({status:false, error: error.details[0].message });
    }

    const { email, password } = req.body;

    // console.log(req.body,'req.body');
    

    try {
        Admin.findByEmail(email, async (err, user) => {

            if (err || !user) {
                return res.status(401).json({ status:false,error: 'User not found' });
            }
            if ( user.role !== 'admin') {
                return res.status(401).json({status:false, error: 'You are not allowed to login from here' });
            }
            if (!user.is_verified) {
                return res.status(400).json({status:false, error: 'Email address not verified' });
            }

            // console.log(user,'uu');
            

            const isPasswordValid = await bcrypt.compare(password, user.password);
// console.log(isPasswordValid);

            if (!isPasswordValid) {
                return res.status(401).json({status:false, error: 'Invalid password' });
            }

            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            res.status(200).json({status:true, message: 'Login successful', token });
        });
    } catch (error) {
        res.status(500).json({status:false, error: 'Login failed' });
    }
};


exports.verifyEmail = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ status: false, error: 'Token is required.' });
    }

    // console.log(token);
    
    try {
        Admin.findOne(token, (err, user) => {
            if (err || !user) {
                return res.status(400).json({ status: false, error: 'Invalid token.' });
            }

            // console.log(user);
            
            const updatedFields = { is_verified: true, verification_token: null };

            Admin.update(user.id,updatedFields, (err, updateUsr) => {
                if (err) {
                    return res.status(500).json({ status: false, error: 'Verification failed.' });
                }
                
                res.status(200).json({ status: true, message: 'Email verified successfully.' });
            });
        });
    } catch (error) {
        res.status(500).json({ status: false, error: 'Verification failed.' });
    }
};
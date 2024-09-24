const Joi = require('joi');


const registrationSchema = Joi.object({
    first_name: Joi.string().min(1).max(50).required(),
    last_name: Joi.string().min(1).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8) 
        .max(128) 
        .required()
        .pattern(/[A-Z]/, 'uppercase') 
        .pattern(/[a-z]/, 'lowercase') 
        .pattern(/[0-9]/, 'digit') 
        .pattern(/[\W_]/, 'special character') 
        .messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
            'string.min': 'Password should be at least 8 characters long.',
            'string.max': 'Password should not be longer than 128 characters.',
        }),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(), 
});
module.exports = {
    registrationSchema: registrationSchema,
    loginSchema: loginSchema,
};

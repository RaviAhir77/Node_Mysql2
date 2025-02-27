import Joi from "joi";

const name = Joi.string().min(4).max(20)
    .pattern(/^[A-Za-z\s]+$/)
    .messages({
        'string.empty' : 'name is a required',
        'string.min' : 'min length is {#limit} required',
        'string.max' : 'max length is {#limit} required',
        'string.pattern.base' : 'Name can a contain only character and space'
    });

const email = Joi.string().email().max(20).min(5);

const username = Joi.string().min(4).max(20).pattern(/^[a-zA-Z][a-zA-Z0-9_.]{3,19}$/)
        .pattern(/^(?!.*[_.]{2})/).messages({
            'string.empty':'username is a required',
            'string.base' :'username can a contain a char,underscore,dot and length must be 4 to 20',
            'string.min' : 'min length is {#limit} required',
            'string.max' : 'max length is {#limit} required',
            'string.pattern.base' : 'username : allow only character, underscore, dot and number'
        });

const password = Joi.string().min(8).max(20).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,20}$/)
    .messages({
      "string.base": "Password must be 8-20 characters and include uppercase, lowercase, number, and special character.",
      "string.empty": "password is a required",
      "string.min": "password minimum length should be {#limit}",
      "string.max": "Password length sorter then {#limit}",
      "string.pattern.base": "Password must be 8-20 characters and include uppercase, lowercase, number, and special character.",
      "any.required": "Password must be 8-20 characters and include uppercase, lowercase, number, and special character."
    });

const age = Joi.number().integer().min(5).max(100).messages({
        "number.base": "Age must be a valid number between 5 and 100.",
        "number,integer" : 'only integer value allow',
        "number.min": "Age must be a valid number between 5 and 100.",
        "number.max": "Age must be a valid number between 5 and 100.",
        "any.required": "Age must be a valid number between 5 and 100."
    });

const usertype = Joi.string()
    .valid("student", "faculty", "admin")
    .messages({
      "any.only": "User type must be one of: student, faculty, or admin.",
      "any.required": "User type must be one of: student, faculty, or admin.",
      "string.base": "User type must be one of: student, faculty, or admin."
    });



export const joiCreateUser = Joi.object({
        name : name.required(),
        email : email.required(),
        username : username.required(),
        password : password.required(),
        age : age.required(),
        usertype : usertype.required(),
    }).unknown(false)

export const joiUpdateUser = Joi.object({
        name : name.optional(),
        username : username.optional(),
        age : age.optional(),
    }).unknown(false)

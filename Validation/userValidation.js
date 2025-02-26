import Joi from "joi";

const userBaseSchema = Joi.object({
    name : Joi.string().min(4).max(20).required()
    .pattern(/^[A-Za-z\s]+$/)
    .messages({
        'string.empty' : 'name is a required',
        'string.min' : 'min length is {#limit} character of you name',
        'string.max' : 'max length is {#limit} character of you name',
        'string.pattern.base' : 'Name can a contain only character and space'
    }),

    email : Joi.string().email().required().max(20).min(5)
})

const userData = {name : 'fgsgdf',email : 'ravi@gmail.com'}

const {error,value} = userBaseSchema.validate(userData)

if(error){
    console.log(error)
}else{
    console.log('validation data : ',value)
}

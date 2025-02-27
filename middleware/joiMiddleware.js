import express from 'express'
import Joi from 'joi';


export const validateSchema = (schema) => async(req,res,next) => {
    const {error} = schema.validate(req.body,{abortEarly: false })
    
    if(error){
        return res.status(400).json({ message: error.details.map(err => err.message) });
    }

    next()
}    
import Joi from "joi";

const userBaseSchema = {
    name : Joi.string().min(4).max(20).rule()
}
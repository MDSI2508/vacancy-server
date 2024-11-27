import {Schema, model} from 'mongoose';
import Joi from 'joi';
import {Vacancy} from "../types/vacancy.ts";

export const VacancySchemaValidate = Joi.object({
    companyName: Joi.string().required(),
    vacancy: Joi.string().required(),
    salaryRange: {
        min: Joi.number().optional().allow(''),
        optimal: Joi.number().optional().allow(''),
    },
    status: Joi.string().optional().allow(''),
    note: Joi.optional().optional().allow(''),
});

const vacancySchema = new Schema<Vacancy>({
    companyName: {
        type: String,
        required: true
    },

    vacancy: {
        type: String,
        required: true
    },

    salaryRange: {
        min: Number,
        optimal: Number,
    },
    status: {
        type: String,
        optional: true,
    },
    note: {
        type: String,
    },


})

export const vacancyModel = model<Vacancy>('vacancy', vacancySchema)

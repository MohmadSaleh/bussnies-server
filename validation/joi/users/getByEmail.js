import Joi from "joi";

const getByEmailSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(5)
        .max(500)
        .required(),
});

const getByEmailSchemaValidation = (userInput) => {
    return getByEmailSchema.validateAsync(userInput);
};
export default getByEmailSchemaValidation;
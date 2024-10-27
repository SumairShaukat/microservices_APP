import Joi from 'joi';

export const productSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
});

export const validateProduct = (data) => {
  const { error, value } = productSchema.validate(data, { abortEarly: false });
  if (error) {
    throw new Error(`Validation error: ${error.details.map((x) => x.message).join(', ')}`);
  }
  return value;
};

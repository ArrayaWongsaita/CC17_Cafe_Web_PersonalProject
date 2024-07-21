import Joi from "joi";

const createProductSchema = Joi.object({
  productName: Joi.string()
    .required()
    .trim()
    .max(191)
    .messages({ "string.empty": "Product Name required." }),
  description: Joi.string()
    .required()
    .trim()
    .max(191)
    .messages({ "string.empty": "description is required." }),

    price: Joi.number().min(0).max(9999999).required(),
    isShow: Joi.string()

});

const validateCreateProduct = (input) => {
  console.log(input)
  const { error } = createProductSchema.validate(input, { abortEarly: false });

  if (error) {
    const result = error.details.reduce((acc, item) => {
      acc[item.path[0]] = item.message;
      return acc;
    }, {});
    console.dir(error);
    return result;
  }
};

export default validateCreateProduct;

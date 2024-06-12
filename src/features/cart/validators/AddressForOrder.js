import Joi from "joi";

const registerSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": "First name is required." }),
  lastName: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": "Last name is required." }),
    address: Joi.string().required(),
    phone: Joi.string().required().pattern(/^[0-9]{10}$/)
});

const validateAddressOrder = (input) => {
  console.log(input)
  const { error } = registerSchema.validate(input, { abortEarly: false });

  if (error) {
    const result = error.details.reduce((acc, item) => {
      acc[item.path[0]] = item.message;
      return acc;
    }, {});
    console.dir(error);
    return result;
  }
};

export default validateAddressOrder;

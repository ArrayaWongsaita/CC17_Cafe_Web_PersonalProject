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
    email: Joi.string()
    .email({  tlds: { allow: ['com', 'net'] } }),
  password: Joi.string()
    .required()
    .pattern(/^[0-9a-zA-Z]{6,}$/)
    .messages({
      "string.empty": "Password is required.",
      "string.pattern.base":
        "passwore must be at least 6 characters and contain only alphabet ",
    }),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .strict()
    .empty("")
    .messages({
      "string.empty": "First name is required.",
      "any.only": "password and confirm password did not match",
    }),
    address: Joi.string().required(),
    phone: Joi.string().required().pattern(/^[0-9]{10}$/)
});

const validateRegister = (input) => {
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

export default validateRegister;

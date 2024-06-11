import Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string()
  .email({  tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().required().pattern(/^[a-zA-Z0-9]{6,}/)
});

const validateLogin = input => {
  const { error} = loginSchema.validate(input,{abortEarly: false})
  if (error) {
    const result = error.details.reduce((acc, item) => {
      acc[item.path[0]] = item.message;
      return acc;
    }, {});
    console.dir(error);
    return result;
  }
}

export default validateLogin;
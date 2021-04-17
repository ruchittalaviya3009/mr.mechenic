const joi = require('joi');
     
function validateUser(user){
  const schema = joi.object({
    username: joi.string().min(3).max(50).required(),
    email: joi.string().min(10).max(255).required().email(),
    password: joi.string().min(5).max(255).required(),
    password2: joi.string().valid(joi.ref('password')).required(),
  });

  return schema.validate(user);
}

exports.validate = validateUser;
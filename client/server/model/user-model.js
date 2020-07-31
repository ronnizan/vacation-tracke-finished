const Joi = require("joi");

class User {
  constructor(userId, firstName, lastName, username, password, isAdmin) {
    if (userId !== undefined) this.userId = userId;
    if (firstName !== undefined) this.firstName = firstName;
    if (lastName !== undefined) this.lastName = lastName;
    if (username !== undefined) this.username = username;
    if (password !== undefined) this.password = password;
    if (isAdmin !== undefined) this.isAdmin = isAdmin;
  }

  validatePost() {
    const schema = {
      userId: Joi.optional(),
      firstName: Joi.string().required().min(0).max(20),
      lastName: Joi.string().required().min(0).max(30),
      username: Joi.string().required().min(0).max(30),
      password: Joi.string().required().min(6).max(30),
      isAdmin: Joi.boolean().optional(),
    };
    const result = Joi.validate(this, schema, { abortEarly: false }); 
    return result.error ? result.error.details[0] : null; 

  }
}

module.exports = User;

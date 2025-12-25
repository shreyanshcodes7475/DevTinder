const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  }

  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }

  return true; // ✅ VERY IMPORTANT
};

const validateProfileEditData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "age",
    "about",
    "skills",
    "photourl",
  ];

  return Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
};

module.exports = {
  validateSignUpData,
  validateProfileEditData,
};

const passwordChange = {
  email: {
    exists: {
      errorMessage: "User's email is required",
    },
  },
  dni: {
    exists: {
      errorMessage: "Dni is required",
    },
  },
  password: {
    exists: {
      errorMessage: "Password is required",
    },
  },
  new_password: {
    exists: {
      errorMessage: "New password is required",
    },
  }
};

module.exports = {
  passwordChange,
};
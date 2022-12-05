const loginUser = {
  email: {
    exists: {
      errorMessage: "User's email is required",
    },
  },
  password: {
    exists: {
      errorMessage: "User's password is required",
    },
  },
};

module.exports = {
  loginUser,
};

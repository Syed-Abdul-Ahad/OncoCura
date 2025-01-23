const customError = require("../utils/customError");
const User = require("./../Model/userModel");
const asyncErrorHandler = require("./../utils/asyncErrorHandler");
const jwt = require("jsonwebtoken");
const util = require("util");
const sendEmail = require("./../utils/email");
const crypto = require("crypto");
const env = require("dotenv");
env.config({ path: "./config.env" });
const bcrypt = require("bcryptjs");

// function for token

const signToken = (ID) => {
  return jwt.sign({ id: ID }, process.env.SECRET_STR, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
};

exports.signup = asyncErrorHandler(async (req, res, next) => {
  const { email, password, confirmPassword, name } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new customError("User already exists with this email", 400));
  }

  const newUser = await User.create(req?.body);

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = asyncErrorHandler(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    const error = new customError(
      "Please provide emailID and Password for login",
      400
    );
    return next(error);
  }

  const user = await User.findOne({ email: email }).select("+password");

  const isMatch = await user.comparePasswordInDB(password, user.password);

  if (!user || !isMatch) {
    const error = new customError("Incorrect email or password", 400);
    return next(error);
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
    user,
  });
});

// protecting routes  (making it a middleware which is used in differnet routes earlier before moving to other middleware)

exports.protect = asyncErrorHandler(async (req, res, next) => {
  // 1) check if token exist?

  const testToken = req.headers.authorization;

  let token;
  if (testToken && testToken.startsWith("Bearer")) {
    token = testToken.split(" ")[1];
  }
  if (!token) {
    const error = new customError("You are not logged in", 401);
    next(error);
  }

  // 2) verify/validate token

  // Promisify the jwt.verify method
  const decodedToken = await util.promisify(jwt.verify)(
    token,
    process.env.SECRET_STR
  );

  // 3) If user exists? (after token user may have deleted the account)

  const user = await User.findById(decodedToken.id);

  if (!user) {
    const err = new customError(
      "The user with the given token doest exist",
      401
    );
    next(err);
  }

  // 4) If the user changed the password after the token has issued

  const isPasswordChanged = await user.isPasswordChanged(decodedToken.iat);
  if (isPasswordChanged) {
    //from UserModel (passing it the time of jwt issued)

    const err = new customError(
      "The password has been changed recently, please login again",
      401
    );
    next(err);
  }

  // 5) allow user to access
  req.user = user;
  next();
});

// middleware function for authorization

exports.restrict = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      const err = new customError(
        "you do not have permission to perform that action",
        403
      );
      next(err);
    }
    next();
  };
};

// forgot password middleware

exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
  //1. get user according to email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    const error = new customError(
      "We couldn't find the user with given email",
      404
    );
    next(error);
  }

  //2. GENERATE A RANDOM RESET TOKEN
  const resetToken = user.createResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  //3. SEND THE TOKEN BACK TO THE USER EMAIL
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `We have recieved a password reset request, please use the below link to reset your password\n\n ${resetUrl} \n\n This reset password link is valid only for 10 minutes`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Password change request",
      message: message,
    });

    res.status(200).json({
      status: "success",
      message: "password reset link send to the user email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    user.save({ validateBeforeSave: false });
    return next(
      new customError(
        "There was an error sending password reset email. please try again",
        500
      )
    );
  }
});

exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    const err = new customError("Token is invalid or it has expired", 400);
    next(err);
  }

  console.log(user);

  // reseting user password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  user.passwordChangedAt = Date.now();

  user.save();

  // loging user again

  const loginToken = signToken(user._id);

  res.status(200).json({
    status: "success",
    token: loginToken,
  });
});

// exports.changePassword = asyncErrorHandler(async (req, res, next) => {
//   const { oldPassword, newPassword, confirmPassword } = req.body;

//   if (!oldPassword || !newPassword || !confirmPassword) {
//     return next(
//       new customError(
//         "Please provide old password, new password, and confirm password",
//         400
//       )
//     );
//   }

//   if (newPassword !== confirmPassword) {
//     return next(
//       new customError("New password and confirm password do not match", 400)
//     );
//   }

//   const user = await User.findById(req.user._id).select("+password");

//   if (!user) {
//     return next(new customError("User not found", 404));
//   }

//   const isMatch = await user.comparePasswordInDB(oldPassword, user.password);

//   if (!isMatch) {
//     return next(new customError("Old password is incorrect", 400));
//   }

//   user.password = await bcrypt.hash(newPassword, 12);
//   user.passwordChangedAt = Date.now();
//   await user.save();

//   const token = signToken(user._id);

//   res.status(200).json({
//     status: "success",
//     message: "Password changed successfully",
//     token,
//   });
// });


exports.changePassword = asyncErrorHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return next(
      new customError("Please provide both old and new passwords", 400)
    );
  }

  const user = await User.findById(req.user._id).select("+password");

  if (!user) {
    return next(new customError("User not found", 404));
  }

  const isMatch = await user.comparePasswordInDB(oldPassword, user.password);

  if (!isMatch) {
    return next(new customError("Old password is incorrect", 400));
  }

  // Update the user's password
  user.password = newPassword;
  user.passwordChangedAt = Date.now();
  await user.save();

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "Password changed successfully",
    token,
  });
});


exports.getUserById = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById({ _id: req.params.id });

  console.log(user);

  if (!user) {
    const err = new customError("User not found", 404);
    next(err);
  }

  res.status(200).json({
    status: "success",
    user,
  });
});



exports.updateUser = asyncErrorHandler(async (req, res) => {
  const { name, email } = req.body;
  const user = req.user._id

  const updatedUser = await User.findByIdAndUpdate(user,{name, email});

  res.status(200).json({
    status : "success",
    data:{
      updatedUser
    }
  })
})

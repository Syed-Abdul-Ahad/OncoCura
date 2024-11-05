const express = require('express');
const authController = require('./../Controller/authController')


const router = express.Router()

router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login)
router.route('/forgotPassword').post(authController.forgotPassword)
router.route('/resetPassword/:token').patch(authController.resetPassword)
router.route("/get-user-by-id/:id").get(authController.getUserById);
router.patch(
  "/changePassword",
  authController.protect,
  authController.changePassword
);

module.exports = router
const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticated, authorizeRole } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/me").get(isAuthenticated, getUserDetails);
router.route("/password/update").get(isAuthenticated, updatePassword);
router.route("/me").get(isAuthenticated, updateProfile);
router
  .route("/admin/users")
  .get(isAuthenticated, authorizeRole("admin"), getAllUser);
router
  .route("/admin/users/:id")
  .get(isAuthenticated, authorizeRole("admin"), getSingleUser)
  .put(isAuthenticated, authorizeRole("admin"), updateUserRole)
  .delete(isAuthenticated, authorizeRole("admin"), deleteUser);

module.exports = router;

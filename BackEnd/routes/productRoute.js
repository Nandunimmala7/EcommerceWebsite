const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productControllers");
const { isAuthenticated, authorizeRole } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/admin/product/new")
  .post(isAuthenticated, authorizeRole("admin"), createProduct);
router
  .route("/product/:id")
  .put(isAuthenticated, updateProduct)
  .delete(isAuthenticated, deleteProduct)
  .get(isAuthenticated, getProductDetails);
router.route("/product/:id").get(getProductDetails);

module.exports = router;

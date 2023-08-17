const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productControllers");
const { isAuthenticated ,authorizeRole } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthenticated, createProduct);
router
  .route("/product/:id")
  .put(isAuthenticated, updateProduct)
  .delete(isAuthenticated,deleteProduct)
  .get(isAuthenticated,getProductDetails);

module.exports = router;

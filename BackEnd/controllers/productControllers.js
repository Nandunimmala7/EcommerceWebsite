const Product = require("../model/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsynchErrors");
const ApiFeatures = require("../utils/apifeatures");

//create product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

  req.body.user = req.user.id;
  const resultPerPage = 5;
  const product = await Product.create(req.body);
  res.status(201).json({
    sucess: true,
    product,
  });
});
//get all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const apifeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apifeature.query;
  const productCount = await Product.countDocuments();
  res.status(200).json({
    sucess: true,
    products,
    productCount
  });
});

//get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  res.status(200).json({
    sucess: true,
    product,
    productCount
  });
});

//update product

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    sucess: true,
    product,
  });
});

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (!(product instanceof Product)) {
      return res.status(500).json({
        success: false,
        message: "Invalid product data",
      });
    }

    await product.remove();
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

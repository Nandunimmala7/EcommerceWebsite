const ErrorHandler = require("../utils/errorHandler");
const catchAsynchErrors = require("./catchAsynchErrors");
const jwt = require('jsonwebtoken')
const User = require('../model/userModel');

exports.isAuthenticated = catchAsynchErrors(async(req,res,next) =>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("please login to access this resource",401))
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET)
  req.user =   await User.findById(decodedData.id)
  next();

})
exports.authorizeRole = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHander(
            `Role: ${req.user.role} is not allowed to access this resouce `,
            403
          )
        );
      }
  
      next();
    };
  };
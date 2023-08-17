const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsynchErrors");
const User = require('../model/userModel');
const sendToken = require("../utils/jwtToken");
//register
exports.registerUser = catchAsyncErrors(async (req,res,next) =>{
    const {name,email,password } = req.body;
    const user = await User.create({
        name,email,password
    })
    const token = user.getJWTToken()
    sendToken(user,201,res);
})
//login
exports.loginUser = catchAsyncErrors(async (req,res,next) =>{
    const {email,password} = req.body;

    // checking

    if(!email || !password){
        return next(new ErrorHandler("please enter email and password"))
    }
    const user = await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("please enter email and password"))
    }
    const isPasswordMatched = user.comparePassword(password);
    if(!isPasswordMatched ){
        return next(new ErrorHandler("please enter email and password",401))
    }
    const token = user.getJWTToken()
    sendToken(user,200,res);
})

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  });
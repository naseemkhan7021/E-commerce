// https://res.cloudinary.com/dubeiwndm/image/upload/v1642848306/User/CodeAlgoTechknow-logobigrounded_jwy5lf.png
// id ==> CodeAlgoTechknow-logobigrounded_jwy5lf.png

const catchAsyncErrors = require("../middlewares/errors/catchAsyncErrors");
const User_model = require("../model/user");
const ErrorHandller = require("../utils/handleError/errorHandller");
const sendToken = require("../utils/helper/jwtToken");
const sendEmail = require("../utils/helper/sendMail");
const crypto = require("crypto");
const cloudinary = require('cloudinary');
// get user from params u_id (user_id) => :u_id
exports.getUserByParamsId = (req, res, next, id) => {
     User_model.findById(id)
          // populate followers and following user array
          .exec((err, user) => {
               if (err || !user) {
                    return next(new ErrorHandller(`User with id '${req.params.u_id}' is not found !!!`, 404))
               }
               user.password = undefined;
               user.resetPasswordExpire = undefined;
               user.resetPasswordToken = undefined;
               req.userProfile = user // adds profile object in req with user info
               // return next()
               next();
          });
}

//POST register new user /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
     const result = await cloudinary.v2.uploader.upload(req.body.avtar, {
          folder: 'avatars',
          width: 150,
          crop: "scale"
     })

     const { name, email, password } = req.body;

     const user = await User_model.create({
          name,
          email,
          password,
          avtar: {
               public_id: result.public_id,
               url: result.secure_url
          }
     })
     sendToken(user, 200, res)

});


// login user /api/v1/login
exports.login = catchAsyncErrors(async (req, res, next) => {
     const { password, email } = req.body;
     if (!password || !email) {
          return next(new ErrorHandller('Please enter email and password!!!'))
     }
     // find user by email 
     const user = await User_model.findOne({ email: { $regex: email, $options: 'i' } }).select('+password');
     if (!user) {
          return next(new ErrorHandller('User with this email or password not found!!', 401))
     }
     // check if password is correct or not
     const isPassword = await user.comparePassword(password);
     if (!isPassword) {
          return next(new ErrorHandller('User with this email or password not found!!', 401))
     }
     // const token = user.getJwtToken();
     // return res.status(200).json({ success: true, token, user });
     sendToken(user, 200, res);
});


// Forgot password => /api/v1/password/forgot
exports.sendPasswordResetToken = catchAsyncErrors((req, res, next) => {
     const { email } = req.body;
     if (!email) {
          return next(new ErrorHandller('Enter your email !!!', 401))
     }
     User_model.findOne({ email: { $regex: email, $options: 'i' } }, (error, user) => {
          if (error || !user) {
               return next(new ErrorHandller('User with this email not found!!', 404))
          }
          // Get reset token
          const resetToken = user.getResetPasswordToken();
          user.save({ validateBeforeSave: false }); // optional
          // create reset url
          // const resetUrl = `${req.protocol}://${req.get('host')}${process.env.BASS_URL}/password/reset/${resetToken}`;
          const resetUrl = process.env.NODE_ENV === 'PRODUCTION' ? `${req.protocol}://${req.get('host')}/auth/password/reset/${resetToken}` : `${process.env.FRONT_URI}/auth/password/reset/${resetToken}`;
          // const resetUrl = `${process.env.FRONT_URI}/auth/password/reset/${resetToken}`;
          // create message for email
          const message = `Your password reset token is follow:\n\n\n ${resetUrl}\n\n\n If you have not requisted the email then ignore it.`;
          // create html for email
          const html = `<div><p>Your password reset token is follow: </p><a href='${resetUrl}'>click me to reset</a><p>If you have not requisted the email then ignore it.</p></div>`;

          try {
               // email data
               sendEmail({
                    email: user.email,
                    subject: 'MernReduxEcommerce password recovery email',
                    message,
                    html
               });
               res.status(200).json({ success: true, message: `Email send to: ${user.email}` })

          } catch (error) {
               user.resetPasswordToken = undefined;
               user.resetPasswordExpire = undefined;

               user.save({ validateBeforeSave: false }); // optional
               return next(new ErrorHandller(error.message, 500))
          }
     });
})


// reset password => /api/v1/password/reset
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
     if (req.params.token) {
          const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
          User_model.findOne({
               resetPasswordToken,
               resetPasswordExpire: { $gt: Date.now() }
          }, (error, user) => {
               if (error || !user) {
                    return next(new ErrorHandller('Password reset token is invalid or has been expired !!', 400))
               }
               if (req.body.password !== req.body.confirmPassword) {
                    return next(new ErrorHandller('Password does not match !!', 400))
               }
               // setup new password
               user.password = req.body.password;
               user.resetPasswordToken = undefined;
               user.resetPasswordExpire = undefined;
               user.save((error, result) => {
                    if (error) {
                         return next(new ErrorHandller('You password must be longer then 6 characters', 401))
                    }
                    sendToken(result, 200, res)
               });
          });

     } else {
          return next(new ErrorHandller('Please provide token !!!'))
     }
})


// logout user => /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
     // res.clearCookie("token")
     res.cookie('token', null, {
          expires: new Date(Date.now()),
          httpOnly: true
     })
     return res.json({
          success: true, massage: 'Signout successfully!!'
     });
});


//GET show user profile => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
     User_model.findById(req.user.id).exec((error, user) => {
          if (error || !user) {
               return next(new ErrorHandller('User not found!!', 400))
          };
          return res.status(200).json({ success: true, user });
     });
});


//PATCH Update/Change Password user profile => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
     const user = await User_model.findById(req.user.id).select('+password');
     if (!user) {
          return next(new ErrorHandller('User not found !!', 404));
     }
     if (!req.body.oldPassword) {
          return next(new ErrorHandller('Please enter old password !!!', 401));
     }
     const isMatched = await user.comparePassword(req.body.oldPassword);
     if (!isMatched) {
          return next(new ErrorHandller('Old Password does not match !!', 401));
     }
     if (!req.body.newPassword) {
          return next(new ErrorHandller('Please enter new password !!!', 401));
     }
     user.password = req.body.newPassword;
     await user.save();
     res.status(200).json({ success: true, message: 'password updated successfully !!' });
});


//PUT update user profile => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
     let updateUserData = {
          name: req.body.name,
          email: req.body.email,
     }
     if (req.body.avtar !== '') {
          const user = await User_model.findById(req.user.id)
          if (user.avtar.public_id) {
               const img_id = user.avtar.public_id
               let res = await cloudinary.v2.uploader.destroy(img_id);
               const result = await cloudinary.v2.uploader.upload(req.body.avtar, {
                    folder: 'avatars',
                    width: 150,
                    crop: "scale"
               });
               updateUserData.avtar = {
                    public_id: result.public_id,
                    url: result.secure_url
               }

          };
     }

     const user = await User_model.findByIdAndUpdate(req.user.id, updateUserData, {
          new: true,
          runValidators: true,
          useFindAndModify: false
     });
     // await user.save();
     res.status(200).json({ success: true, message: `Your Profile updated !!!`, user });
});



// Admin routes
// GET show all profile => /api/v1/admin/users
exports.getAllUserProfile = catchAsyncErrors(async (req, res, next) => {
     User_model.find().exec((error, users) => {
          if (error || !users) {
               return next(new ErrorHandller('Somthing error equire !!!', 501))
          }
          res.status(200).json({ success: true, totalusersCount: users.length, users })
     });
});

// GET show all profile => /api/v1/admin/user/:u_id
exports.getUserbyId = catchAsyncErrors(async (req, res, next) => {
     res.status(200).json({ success: true, user: req.userProfile })
})

//PUT update user profile => /api/v1/admin/user/:u_id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
     if (req.params.u_id) {
          const user = await User_model.findByIdAndUpdate(req.params.u_id, req.body, {
               new: true,
               runValidators: true,
               useFindAndModify: false
          });
          if (!user) {
               return next(new ErrorHandller(`User with id '${req.params.u_id}' is not found`))
          }
          // await user.save();
          res.status(200).json({ success: true, message: `${user.name}'s Profile updated !!!`, user });
     }
     else {
          return next(new ErrorHandller('User not found!!', 404))
     }
})

//DELETE user profile => /api/v1/admin/user/:u_id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
     if (req.params.u_id) {
          const user = await User_model.findById(req.params.u_id);
          if (!user) {
               return next(new ErrorHandller(`User with id '${req.params.u_id}' is not found`))
          }
          // await user.save();
          user.remove()
          res.status(200).json({ success: true, message: `${user.name}'s Profile Deleted !!!`, user });
     }
     else {
          return next(new ErrorHandller('User not found!!', 404))
     }
})
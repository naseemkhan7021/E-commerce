// const sendToken = (user, statusCode, res) => {
//      // create jwt token
//      const token = user.getJwtToken();

//      // options for cookie
//      const options = {
//           // domain: "localhost:3000",
//           expires: new Date(
//                Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
//           ),
//           // // secure: true, // process.env.NODE_ENV !== "development"  
//           sameSite: 'lax', // none,strict,lax
//           httpOnly: true
//      }
//      console.log('this => ', options, 'token -> ', token);
//      // user.password = undefined;
//      res.status(statusCode).cookie('token', token, options).json({
//           success: true, token, user
//      });
// };

// module.exports = sendToken;

// Create and send token and save in the cookie.
const sendToken = (user, statusCode, res) => {

     // Create Jwt token
     const token = user.getJwtToken();

     // Options for cookie
     const options = {
          expires: new Date(
               Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
          ),
          httpOnly: true
     }


     res.status(statusCode).cookie('token', token, options).json({
          success: true,
          token,
          user
     })

}

module.exports = sendToken;
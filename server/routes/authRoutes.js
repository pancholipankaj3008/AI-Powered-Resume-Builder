let express = require('express');
const { Register, Login } = require('../controllers/authController');

let authRouter = express.Router();


authRouter.post("/register",Register);
authRouter.post("/login", Login);



module.exports=authRouter;
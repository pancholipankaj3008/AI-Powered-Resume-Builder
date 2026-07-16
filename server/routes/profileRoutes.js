let express = require('express');
const Auth = require('../middlewares/authMiddleware');
const { GetProfile, UpdatePassword, Logout } = require('../controllers/profileController');

let profileRouter = express.Router();

profileRouter.get("/profile", Auth("user"), GetProfile);
profileRouter.post("/logout", Auth("user"), Logout);
profileRouter.put("/update-password", Auth("user"), UpdatePassword);


module.exports=profileRouter;
let express = require('express');
const Auth = require("../middlewares/authMiddleware");
let resumeRouter = express.Router();

const { CreateResume, GetAllResume, GetResumeById, UpdateResume, DeleteResume } = require("../controllers/resumeController");



resumeRouter.post("/create-resume", Auth("user"), CreateResume);
resumeRouter.get("/get-resume", Auth("user"), GetAllResume);
resumeRouter.get("/get-resume/:id", Auth("user"), GetResumeById);
resumeRouter.put("/update-resume/:id", Auth("user"), UpdateResume);
resumeRouter.delete("/delete-resume/:id", Auth("user"), DeleteResume);




module.exports=resumeRouter;

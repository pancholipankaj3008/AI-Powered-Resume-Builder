let dotenv = require('dotenv');
dotenv.config();

let express = require('express');
let cors = require('cors');
const cookieParser = require("cookie-parser");
const ConnectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const authRouter = require('./routes/authRoutes');
const profileRouter = require('./routes/profileRoutes');
const resumeRouter = require('./routes/resumeRoutes');
const aiRouter = require('./routes/aiRoutes');
const pdfRouter = require('./routes/pdfRoutes');

let app = express();
let port = process.env.PORT;

// Render terminates HTTPS before forwarding the request to Express. This
// preserves the original https protocol when creating the PDF browser URL.
app.set("trust proxy", 1);

app.use(express.json());
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}));
app.use(cookieParser());

app.get("/test", (req, res) => {
    res.json({ success: true, message: "test route hit" });
})

app.use("/auth", authRouter);
app.use("/user", profileRouter)
app.use("/resume", resumeRouter)
app.use("/pdf", pdfRouter)

app.use("/ai", aiRouter);



app.use(notFound);
app.use(errorHandler);


async function StartServer() {
    try {

        await ConnectDB();

        app.listen(port, () => {
            console.log(`Server runnig on port ${port}`);
        })

    } catch (error) {
        console.log("Database Connection Failed: ",error.message);
        process.exit(1);
    }
}

StartServer();


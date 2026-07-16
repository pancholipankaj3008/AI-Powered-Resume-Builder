let dotenv = require('dotenv');
dotenv.config();

let express = require('express');
let cors = require('cors');
const cookieParser = require("cookie-parser");
const ConnectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const authRouter = require('./routes/authRoutes');
const profileRouter = require('./routes/profileRoutes');

let app = express();
let port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/test", (req, res) => {
    res.json({ success: true, message: "test route hit" });
})

app.use("/auth", authRouter);
app.use("/user", profileRouter)



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


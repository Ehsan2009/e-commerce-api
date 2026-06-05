require("dotenv").config();

// express
const express = require("express");
const app = express();

// rest of the packages
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const cors = require("cors")

// database
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/auth_routes")
const userRouter = require("./routes/user_routes")
const productRouter = require("./routes/product_routes")

// middleware
const notFoundMiddleware = require("./middleware/not_found");
const errorHandlerMiddleware = require("./middleware/error_handler");

app.use(morgan("tiny"))
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET))
app.use(cors())

app.get("/", (req, res) => {
  res.send("ecommerce api");
});

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/products", productRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

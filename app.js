require("dotenv").config();
//async errors

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const routeNoutFound = require("./middleware/route-not-found");
const errorHandler = require("./middleware/error-handler");

//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send('<h1>Store Api</h1><a href="/api/v1/products">products  route</a> ');
});

//products route

app.use(routeNoutFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    //connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();

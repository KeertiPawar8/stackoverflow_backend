const express = require("express");
require("dotenv").config();
const { connection } = require("./db");
const { userRouter } = require("./routes/user.route");
const { quesRouter } = require("./routes/question.routes");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async(req,res) => {
  res.send("HOME PAGE");
});
app.use("/", userRouter);
app.use("/", quesRouter);




app.listen(8080, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }

  console.log(`server is running at port ${process.env.port}`);
});

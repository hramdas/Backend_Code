const express = require("express");
const app = express();

app.use(express.json());

const connect = require("./configs/db");
const { register, login } = require("./controllers/auth");

app.post("/register", register);
app.post("/login", login);

app.listen(2000, async () => {
  await connect();
  console.log("listening on 2000");
});

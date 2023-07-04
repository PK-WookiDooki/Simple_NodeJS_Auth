import express from "express";
import { fn } from "sequelize";
const port = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

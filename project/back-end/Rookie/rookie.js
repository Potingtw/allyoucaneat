import express from "express";
import cors from "cors";
import connToDBHelper from "../DB/DBconfig.js";
var app = express();

app.use(cors());

app.get("/", function (req, res) {
  res.send("rookie連接成功");
});

app.get("/rookie", function (req, res) {
  connToDBHelper.query("SELECT * FROM `rookie` ", [], function (err, data) {
    if (err) {
      return "查無資料";
    } else {
      return res.json(data);
    }
  });
});

app.listen(5432, () => {
  console.log("rookie5432開始拉" + new Date().toLocaleTimeString());
});

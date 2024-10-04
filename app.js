const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();

const user = require("./routes/user");
const home = require("./routes/home");
const machineRoutes = require("./routes/machines");
const templateRoutes = require("./routes/template");
const inspectionRoutes = require("./routes/inspection");

app.use(morgan("tiny"));

//cors middleware
app.use(cors({ origin: true, credentials: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

//cookie parser middleware
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Route handlers
app.use("/api/v1", user);
app.use("/api/v1", home);
app.use("/api/v1/machines", machineRoutes);
app.use("/api/v1/template", templateRoutes);
app.use("/api/v1/inspection", inspectionRoutes);

//exporting app js
module.exports = app;

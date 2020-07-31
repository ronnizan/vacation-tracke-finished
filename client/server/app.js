global.config = require(process.env.NODE_ENV === "production"
  ? "./config-prod"
  : "./config-dev");
const express = require("express");
const cors = require("cors");
const authController = require("./controllers/auth-controller");
const vacationsController = require("./controllers/vacations-controller");
const socketIO = require("socket.io");
const path = require("path");
const fs = require("fs");
const fileUpload = require("express-fileupload");



const app = express();


app.use(fileUpload());
app.use(cors());
app.use(express.json());

//make file
if (!fs.existsSync('../client/public/assets/images/')) {
  fs.mkdirSync('../client/public/assets/images/');
}

// server.use(express.static(path.join(__dirname, "./_front-end")));
app.use(express.static(__dirname)); // "/" ==> "index.html"
app.use("/api/auth", authController);
app.use("/api/vacations", vacationsController);
// server.use("*", (request, response) => {
//     response.sendFile(path.join(__dirname, "./_front-end/index.html"));
// });
const port = process.env.PORT || 3000;

const listener = app.listen(port, () => console.log(`Example app listening on port ` + port));
global.socketServer = socketIO(listener);



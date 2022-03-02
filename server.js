let express = require("express");
let server = express();
let path = require("path");
let public = path.join(__dirname, "public");
let port = 3000;

server.get("/", function (req, res) {
  res.sendFile(path.join(public, "index.html"));
});

server.use("/", express.static(public));

server.listen(port);
console.log("server is ready, port: 3000");

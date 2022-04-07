const express = require("express");
const app = express();
const port = 3000;

app.use("/", express.static("public"));

app.get("/shutdown", (req, res) => {
  const spawn = require("child_process").spawn;
  const pythonProcess = spawn("python", ["shutdown.py"]);
  pythonProcess.stdout.on("data", (data) => {
    res.send(data.toString());
  });
});

app.listen(port, () => {
  console.log(`Server is Listening on ${port}`);
});

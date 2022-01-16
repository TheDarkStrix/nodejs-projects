const path = require("path");
const express = require("express");

const app = express();
const publicDirPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.use(express.static(publicDirPath));

app.get("/weather", (req, res) => {
  res.send({
    forecast: "it is snowing",
    location: "Bangalore",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});

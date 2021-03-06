const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

const PORT = process.env.PORT || 3000;

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "Manoj" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About page", name: "Manoj" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Manoj",
    message: "This is a help message",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Address is required" });
  }

  geocode(req.query.address, (error, geocodeData) => {
    if (error) {
      return res.send({ error: error });
    }
    forecast(
      geocodeData.latitude,
      geocodeData.longitude,
      (error, forecastData) => {
        if (error) {
          return res.send({ error: error });
        }

        res.send({
          forecast: forecastData,
          location: geocodeData.location,
          address: req.query.address,
        });
      }
    );
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    error: "Help article not found",
    title: "404",
    name: "Manoj",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    error: "Page not found.",
    title: "404",
    name: "Manoj",
  });
});

app.listen(PORT, () => {
  console.log("Server is up on port " + PORT);
});

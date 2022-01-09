const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const address = process.argv[2];

if (!address) {
  return console.log("Please enter a valid location name");
}

geocode(address, (error, geocodeData) => {
  if (error) {
    return console.log(error);
  }
  forecast(
    geocodeData.latitude,
    geocodeData.longitude,
    (error, forecastData) => {
      if (error) {
        return console.log(error);
      }

      console.log(geocodeData.location);
      console.log(forecastData);
    }
  );
});

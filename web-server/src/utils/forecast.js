const request = require("postman-request");

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=0ca2b163993f393337986e17b4ac0b21&query=${lat},${lon}&units=f`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to forecast services!", undefined);
    } else if (response.body.error) {
      callback(
        "Unable to find forecast of the location, Try another search",
        undefined
      );
    } else {
      callback(
        undefined,
        `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. There is ${response.body.current.precip}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;

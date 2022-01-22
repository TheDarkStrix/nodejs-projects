const fetchWeather = (location) => {
  fetch(`/weather?address=${location}`)
    .then((response) => {
      response.json().then((data) => {
        if (data.error) return (result.innerHTML = data.error);
        result.innerHTML = `<p>${data.location}</p><p>${data.forecast}</p>`;
      });
    })
    .catch((error) => {
      result.innerHTML = error;
    });
};

const weatherForm = document.querySelector("form");
const weatherLocation = document.querySelector("input");
const result = document.querySelector("#result");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  result.textContent = "Loading...";
  fetchWeather(weatherLocation.value);
});

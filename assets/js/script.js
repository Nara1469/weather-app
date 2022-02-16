const myApiKey = "b9d312a1f35b1b477f63e4d5e699509c";

let today = moment();

const cityName = document.getElementById("city-name");
const searchCity = document.getElementById("search-city");

const cityArray = [];

function getApiData(inputCity) {

  const weatherUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&limit=1&appid=${myApiKey}`;

  fetch(weatherUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          if (data.length > 0) {  // checks if the city found
            const foundCity = data[0].name;
            if (foundCity.toLowerCase() === inputCity.toLowerCase()) {  // checks (found city === entered city)
              const lat = data[0].lat;
              const lon = data[0].lon;

              const newWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${myApiKey}&units=imperial`;

              fetch(newWeatherUrl)
                .then(function (response) {
                  return response.json();
                })
                .then(function (data) {
                  console.log(data);
                  // Current forecast
                  $("#current-city").html(foundCity);
                  $("#current-date").html("(Today: " + today.format("l") + ")");
                  $("#current-icon").attr("src", "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png");
                  $("#current-temp").html(data.current.temp + "°F");
                  $("#current-wind").html(data.current.wind_speed + " mph");
                  $("#current-humid").html(data.current.humidity + " %");
                  $("#current-index").html(data.current.uvi);
                  colorUvi(data.current.uvi);
                  // 5-Day Forecast
                  for (let i = 1; i <= 5; i++) {
                    let dayId = "";
                    dayId = "#day" + i + "-date";
                    $(dayId).html(today.add(1, 'd').format("l"));
                    dayId = "#day" + i + "-icon";
                    $(dayId).attr("src", "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png");
                    dayId = "#day" + i + "-temp";
                    $(dayId).html(data.daily[i].temp.max + "°F");
                    dayId = "#day" + i + "-wind";
                    $(dayId).html(data.daily[i].wind_speed + " mph");
                    dayId = "#day" + i + "-humid";
                    $(dayId).html(data.daily[i].humidity + " %");
                  }
                  today = moment();
                  if (!cityArray.includes(foundCity)) {
                    // Create new button for the searched city
                    const newBtn = document.createElement('button');
                    newBtn.classList.add("form-control");
                    newBtn.classList.add("btn");
                    newBtn.classList.add("btn-secondary");
                    newBtn.classList.add("add-space");
                    newBtn.textContent = foundCity;
                    searchCity.appendChild(newBtn);
                    // Save the searched city
                    cityArray.push(foundCity);
                    localStorage.setItem("city", JSON.stringify(cityArray));
                  }
                });
            } else {
              alert("Check the city name!");
            }
          } else {
            alert("Check the city name!");
          }
        });
      }
    });
}

// color the UV index

function colorUvi(uvIndex) {
  if (uvIndex <= 2) { // LOW - Green (safe)
    $("#current-index").attr("style", "background-color: green;");
  }
  if ((uvIndex > 2) && (uvIndex <= 5)) {  // MODERATE - Yellow
    $("#current-index").attr("style", "background-color: yellow;");
  }
  if ((uvIndex > 5) && (uvIndex <= 7)) {  // HIGH -Orange
    $("#current-index").attr("style", "background-color: orange;");
  }
  if ((uvIndex > 7) && (uvIndex <= 10)) {  // VERY HIGH - red
    $("#current-index").attr("style", "background-color: red;");
  }
  if (uvIndex > 10) {  // EXTREME - Purple 
    $("#current-index").attr("style", "background-color: purple;");
  }
}

function init() {
  localStorage.clear();
  getApiData("Atlanta");       // Default City Atlanta
}

init();

// ------------ Event Listeners --------------

$('#search-button').on('click', function (event) {
  event.preventDefault();
  const city = cityName.value;
  console.log(city);
  if (city) {
    getApiData(city);
  }
});

$('#search-city').on('click', function (event) {
  event.preventDefault();
  const tempElement = event.target;
  const city = tempElement.textContent;
  getApiData(city);
});
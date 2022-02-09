const myApiKey = "b9d312a1f35b1b477f63e4d5e699509c";

let today = moment();

const searchBtn = document.getElementById("search-button");
const cityName = document.getElementById("city-name");
const searchCity = document.getElementById("search-city");

const currentCity = document.getElementById("current-city");
const currentDate = document.getElementById("current-date");
const currentIcon = document.getElementById("current-icon");
const currentTemp = document.getElementById("current-temp");
const currentWind = document.getElementById("current-wind");
const currentHumid = document.getElementById("current-humid");
const currentUvi = document.getElementById("current-index");

const day1Date = document.getElementById("day1-date");
const day1Icon = document.getElementById("day1-icon");
const day1Temp = document.getElementById("day1-temp");
const day1Wind = document.getElementById("day1-wind");
const day1Humid = document.getElementById("day1-humid");

const day2Date = document.getElementById("day2-date");
const day2Icon = document.getElementById("day2-icon");
const day2Temp = document.getElementById("day2-temp");
const day2Wind = document.getElementById("day2-wind");
const day2Humid = document.getElementById("day2-humid");

const day3Date = document.getElementById("day3-date");
const day3Icon = document.getElementById("day3-icon");
const day3Temp = document.getElementById("day3-temp");
const day3Wind = document.getElementById("day3-wind");
const day3Humid = document.getElementById("day3-humid");

const day4Date = document.getElementById("day4-date");
const day4Icon = document.getElementById("day4-icon");
const day4Temp = document.getElementById("day4-temp");
const day4Wind = document.getElementById("day4-wind");
const day4Humid = document.getElementById("day4-humid");

const day5Date = document.getElementById("day5-date");
const day5Icon = document.getElementById("day5-icon");
const day5Temp = document.getElementById("day5-temp");
const day5Wind = document.getElementById("day5-wind");
const day5Humid = document.getElementById("day5-humid");

const cityArray = [];

function getCityName(event) {
  event.preventDefault();
  const city = cityName.value;
  if (city) {
    getApi(city);
  }
}

function showSearchedCityForecast(event) {
  event.preventDefault();
  const tempElement = event.target;
  const city = tempElement.textContent;
  getApi(city);
}

function getApi(newCity) {

  const weatherUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${newCity}&limit=1&appid=${myApiKey}`;

  fetch(weatherUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          if (data.length > 0) {  // checks if the city found
            const checkCity = data[0].name;
            console.log(checkCity);
            const nameArray = newCity.split('');
            nameArray[0] = nameArray[0].toUpperCase();
            newCity = nameArray.join('');
            if (checkCity === newCity) {  // checks (found city === entered city)
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
                  currentCity.textContent = checkCity;
                  currentDate.textContent = "(Today: " + today.format("l") + ")";
                  currentIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png");
                  currentTemp.textContent = data.current.temp + "°F";
                  currentWind.textContent = data.current.wind_speed + " MPH";
                  currentHumid.textContent = data.current.humidity + " %";
                  currentUvi.textContent = data.current.uvi;
                  colorUvi(data.current.uvi);
                  // Day 1 forecast
                  day1Date.textContent = today.add(1, 'd').format("l");
                  day1Icon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + "@2x.png");
                  day1Temp.textContent = data.daily[1].temp.max + "°F";
                  day1Wind.textContent = data.daily[1].wind_speed + " mph";
                  day1Humid.textContent = data.daily[1].humidity + " %";
                  // Day 2 forecast
                  day2Date.textContent = today.add(1, 'd').format("l");
                  day2Icon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + "@2x.png");
                  day2Temp.textContent = data.daily[2].temp.max + "°F";
                  day2Wind.textContent = data.daily[2].wind_speed + " mph";
                  day2Humid.textContent = data.daily[2].humidity + " %";
                  // Day 3 forecast
                  day3Date.textContent = today.add(1, 'd').format("l");
                  day3Icon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + "@2x.png");
                  day3Temp.textContent = data.daily[3].temp.max + "°F";
                  day3Wind.textContent = data.daily[3].wind_speed + " mph";
                  day3Humid.textContent = data.daily[3].humidity + " %";
                  // Day 4 forecast
                  day4Date.textContent = today.add(1, 'd').format("l");
                  day4Icon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + "@2x.png");
                  day4Temp.textContent = data.daily[4].temp.max + "°F";
                  day4Wind.textContent = data.daily[4].wind_speed + " mph";
                  day4Humid.textContent = data.daily[4].humidity + " %";
                  // Day 5 forecast
                  day5Date.textContent = today.add(1, 'd').format("l");
                  day5Icon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.daily[5].weather[0].icon + "@2x.png");
                  day5Temp.textContent = data.daily[5].temp.max + "°F";
                  day5Wind.textContent = data.daily[5].wind_speed + " mph";
                  day5Humid.textContent = data.daily[5].humidity + " %";
                  today = moment();
                  if (!cityArray.includes(checkCity)) {
                    // Create new button for the searched city
                    const newBtn = document.createElement('button');
                    newBtn.classList.add("form-control");
                    newBtn.classList.add("btn");
                    newBtn.classList.add("btn-secondary");
                    newBtn.classList.add("add-space");
                    newBtn.textContent = checkCity;
                    searchCity.appendChild(newBtn);
                    // Save the searched city
                    cityArray.push(checkCity);
                    localStorage.setItem("city", JSON.stringify(cityArray));
                  }
                });
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
    currentUvi.setAttribute("style", "background-color: green;");
  }
  if ((uvIndex > 2) && (uvIndex <= 5)) {  // MODERATE - Yellow
    currentUvi.setAttribute("style", "background-color: yellow;");
  }
  if ((uvIndex > 5) && (uvIndex <= 7)) {  // HIGH -Orange
    currentUvi.setAttribute("style", "background-color: orange;");
  }
  if ((uvIndex > 7) && (uvIndex <= 10)) {  // VERY HIGH - red
    currentUvi.setAttribute("style", "background-color: red;");
  }
  if (uvIndex > 10) {  // EXTREME - Purple 
    currentUvi.setAttribute("style", "background-color: purple;");
  }
}

function init() {
  localStorage.clear();
  getApi("Atlanta");       // Default City Atlanta
}

init();

searchBtn.addEventListener("click", getCityName);

searchCity.addEventListener("click", showSearchedCityForecast);
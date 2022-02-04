const myApiKey = 'b9d312a1f35b1b477f63e4d5e699509c';
const cityName = 'Denver';

const today = moment();

$("#day1-date").text(today.format("l"));

const searchBtn = document.getElementById('search-button');

function getApi() {

    const weatherUrl = 'api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + myApiKey;
    console.log(weatherUrl);
  
    fetch(weatherUrl)
      .then(function (response) {
          console.log(response);
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        //   var listItem = document.createElement('li');
        //   listItem.textContent = data[i].html_url;
        //   repoList.appendChild(listItem);
      });
  }

searchBtn.addEventListener('click', getApi);
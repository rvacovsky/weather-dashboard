var cityFormEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city");
var getTemp = document.getElementById("temp");
var getWind = document.getElementById("wind");
var getHumidity = document.getElementById("humidity");
var getUV = document.getElementById("uvindex");
var weatherSearchTerm = document.querySelector("#weather-search");
var weatherContainerEl = document.querySelector("#weather-container");
var fiveDayForecast = document.getElementById("five-dayforecast");
var CitySearchHistory = document.getElementById("history-search");

// Current Date
var currentDate = moment().format("dddd, MMMM Do, YYYY");
$("#currentDay").text(currentDate);

// gets the city name from the search bar
var formSubmitHandler = (event) => {
  // prevent page from refreshing
  event.preventDefault();
  // get value from input element
  var cityName = cityInputEl.value.trim();
  if (cityName) {
    renderHistory(cityName);
    getWeather(cityName);
    weatherContainerEl.textContent = "";
    cityInputEl.value = "";
  } else {
    alert("Please enter a valid city name!");
  }
};

var buttonClickHandler = function (event) {
  var savedCity = event.target.getAttribute(CitySearchHistory);

  if (savedCity) {
    getWeather(savedCity);

    weatherContainerEl.textContent = "";
  }
};

// gets weather from city added
var getWeather = (text) => {
    forecastList = "";
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    text +
    "&appid=51a61d96cb3c110846e5130afe5ac605";

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log("forecastData", data);
          displayForecast(data, text);
        });
      } else {
        alert("Error:" + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeather");
    });
    
};

var displayForecast = function (data, searchTerm) {
  if (data.length === 0) {
    weatherContainerEl.textContent = "City not found.";
    return;
  }

  weatherSearchTerm.textContent = searchTerm;

  //latitude and longitude from first API fetch to populate the onecall fetch
  const lat = data.city.coord.lat;
  const lon = data.city.coord.lon;

  // runs fetch of city data through lat and lon to bring up actual city weather
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=imperial&appid=51a61d96cb3c110846e5130afe5ac605"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Get weather pic
      const weatherIcon = data.current.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
      $("#wicon").attr("src", iconurl);
      // populate Current Weather
      getTemp.innerHTML = "Temp: " + data.current.temp + "&deg" + " F";
      getWind.innerHTML = "Wind: " + data.current.wind_speed + " MPH";
      getHumidity.innerHTML = "Humidity: " + data.current.humidity + " %";
      getUV.innerHTML = "UV Index: " + data.current.uvi;
      // change color of text based on UV index
      if (data.current.uvi <= 2.99) {
        getUV.style.color = "green";
        return getUV.style.color;
      } else if (data.current.uvi >= 3 && getUV <= 5.99) {
        getUV.style.color = "yellow";
        return getUV.style.color;
      } else if (data.current.uvi >= 6 && getUV <= 7.99) {
        getUV.style.color = "orange";
        return getUV.style.color;
      } else data.current.uvi >= 8;
      getUV.style.color = "red";
    });
  getFuture(data);
};

var getFuture = (data) => {
  weatherContainerEl.textContent = "";

  const lat = data.city.coord.lat;
  const lon = data.city.coord.lon;

  // runs fetch of city data through lat and lon to bring up actual city weather
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=imperial&appid=51a61d96cb3c110846e5130afe5ac605"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      getForecast(data);
    });
};

var foreCastDataObj = {};

function getForecast(data) {
  console.log("getForecast input data", data);
  var forecast = data["daily"];
  console.log(forecast);
  var iterCounter = 0;

  forecast.forEach((i) => {
    iterCounter++;
    if (iterCounter <= 5) {
      console.log(i);
      foreCastDataObj["Day" + iterCounter] = i;
      render5Day(i);
    }
  });
  fiveDayForecast.innerHTML = forecastList;
}
var forecastList = "";

function render5Day(forecast) {
  var day = moment.unix(forecast.dt);
  var date = day._d;
  console.log(date);

  let forecastFiveDays = `
  <li>
    <ul>
      <b>${date}</b>
      <li>Temp: ${forecast.temp.max} F</li>
      <li>Wind: ${forecast.wind_speed}MPH</li>
      <li>Humidity: ${forecast.humidity}%</li>
    </ul> 
    <br/>
  </li>
  `;

  forecastList += forecastFiveDays;
}

var citySearchList = "";

function renderHistory(city) { 
  console.log(city);
  let historyRender =`
<button onclick="getWeather('${city}')" class="btn">${city}</button>`;

citySearchList += historyRender;
CitySearchHistory.innerHTML = citySearchList;
}

cityFormEl.addEventListener("submit", formSubmitHandler);

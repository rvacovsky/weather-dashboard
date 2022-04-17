var cityFormEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city");
var cityResult = document.getElementById("city-result");
var getTemp = document.getElementById("temp");
var getWind = document.getElementById("wind");
var getHumidity = document.getElementById("humidity");
var getUV = document.getElementById("uvindex");
// var weatherContainerEl = document.querySelector("#container-lg");

var currentDate = moment().format("dddd, MMMM Do, YYYY");
$("#currentDay").text(currentDate);

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
    console.log(cityInputEl);
    // get value from input element
    var cityName = cityInputEl.value.trim();

    if (cityName) {
      getWeather(cityName);
      cityInputEl.value = "";
    } else {
      alert("Please enter a valid city name!");
    }
};



var getWeather =function(text) {

var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + text + "&appid=51a61d96cb3c110846e5130afe5ac605";

    fetch(apiUrl).then(function(response) {
        
      console.log(response);
      response.json().then(function(data) {
      console.log(data);
      // Show city searched in current weather section
      cityResult.innerHTML = data.city.name;
      


        const lat = data.city.coord.lat;
        const lon = data.city.coord.lon;
        
        // runs fetch of city data through lat and lon call to bring up actual city weather
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=51a61d96cb3c110846e5130afe5ac605")
          .then(function (response) {
              return response.json();
              })
              .then(function (data) {
                  // appendData(data);
              console.log(data);
              // Get weather pic
              const weatherIcon = data.current.weather[0].icon;
              var iconurl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
              $('#wicon').attr('src', iconurl);
              getTemp.innerHTML = "Temp: " + data.current.temp + "&deg" + " F";
              getWind.innerHTML = "Wind: " + data.current.wind_gust + " MPH";
              getHumidity.innerHTML = "Humidity: " + data.current.humidity + " %";
              getUV.innerHTML = "UV Index: " + data.current.uvi;
              // change color of text based on UV index 
              if (data.current.uvi <= 2.99) {
                getUV.style.color = "green";
              } else if (data.current.uvi >= 3 && getUV <= 5.99) {
                getUV.style.color = "yellow";
              } else if (data.current.uvi >= 6 && getUV <= 7.99) {
                getUV.style.color = "orange";
              } else (data.current.uvi >= 8)
                getUV.style.color = "red";
 
            })


        // 5-day forecast
        var cityId = data.city.id;
        console.log(cityId); 
        fetch("https://api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&appid=51a61d96cb3c110846e5130afe5ac605")
        .then(function(response) {
          return response.json();
        })
        const getForecast = document.querySelectorAll("forecast");
            for (i=0; i < getForecast.length; i++) {
                getForecast[i].innerHTML = "";
                console.log(getForecast);    
         
      };
    });

  
});        
};
cityFormEl.addEventListener("submit", formSubmitHandler)

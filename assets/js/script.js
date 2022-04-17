var cityFormEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city");
var cityResult = document.getElementById("city-result");
var getTemp = document.getElementById("temp");
var getWind = document.getElementById("wind");
var getHumidity = document.getElementById("humidity");
var getUV = document.getElementById("uvindex");


// Current Date
var currentDate = moment().format("dddd, MMMM Do, YYYY");
$("#currentDay").text(currentDate);
//Forecast Dates
var day1 = moment().add(1, 'days').format("dddd, MMMM Do, YYYY").toString();
var day2 = moment().add(2, 'days').format("dddd, MMMM Do, YYYY");
var day3 = moment().add(3, 'days').format("dddd, MMMM Do, YYYY");
var day4 = moment().add(4, 'days').format("dddd, MMMM Do, YYYY");
var day5 = moment().add(5, 'days').format("dddd, MMMM Do, YYYY");


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
              console.log(weatherIcon);
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

        // 5-DAY FORECAST
        // the Dates
        $("#day1").text(day1);
        $("#day2").text(day2);
        $("#day3").text(day3);
        $("#day4").text(day4);
        $("#day5").text(day5);
        // the Weather Icons
        var iconurl1 = "http://openweathermap.org/img/w/" + data.daily[0].weather[0].icon + ".png";
        $('#wicon1').attr('src', iconurl1);
        var iconurl2 = "http://openweathermap.org/img/w/" + data.daily[1].weather[0].icon + ".png";
        $('#wicon2').attr('src', iconurl2);
        var iconurl3 = "http://openweathermap.org/img/w/" + data.daily[2].weather[0].icon + ".png";
        $('#wicon3').attr('src', iconurl3);
        var iconurl4 = "http://openweathermap.org/img/w/" + data.daily[3].weather[0].icon + ".png";
        $('#wicon4').attr('src', iconurl4);
        var iconurl5 = "http://openweathermap.org/img/w/" + data.daily[4].weather[0].icon + ".png";
        $('#wicon5').attr('src', iconurl5);
        // the Temp
        getTemp1 = document.getElementById("temp1");
        getTemp1.innerHTML = "Temp: " + data.daily[0].temp.max + "&deg" + " F";
        getTemp2 = document.getElementById("temp2");
        getTemp2.innerHTML = "Temp: " + data.daily[1].temp.max + "&deg" + " F";
        getTemp3 = document.getElementById("temp3");
        getTemp3.innerHTML = "Temp: " + data.daily[2].temp.max + "&deg" + " F";
        getTemp4 = document.getElementById("temp4");
        getTemp4.innerHTML = "Temp: " + data.daily[3].temp.max + "&deg" + " F";
        getTemp5 = document.getElementById("temp5");
        getTemp5.innerHTML = "Temp: " + data.daily[4].temp.max + "&deg" + " F";
        // the Wind
        getWind1 = document.getElementById("wind1")
        getWind1.innerHTML = "Wind: " + data.daily[0].wind_gust + " MPH";
        getWind2 = document.getElementById("wind2")
        getWind2.innerHTML = "Wind: " + data.daily[1].wind_gust + " MPH";
        getWind3 = document.getElementById("wind3")
        getWind3.innerHTML = "Wind: " + data.daily[2].wind_gust + " MPH";
        getWind4 = document.getElementById("wind4")
        getWind4.innerHTML = "Wind: " + data.daily[3].wind_gust + " MPH";
        getWind5 = document.getElementById("wind5")
        getWind5.innerHTML = "Wind: " + data.daily[4].wind_gust + " MPH";
        // the Humidity
        getHumidity1 = document.getElementById("humidity1");
        getHumidity1.innerHTML = "Humidity: " + data.daily[0].humidity + " %";
        getHumidity2 = document.getElementById("humidity2");
        getHumidity2.innerHTML = "Humidity: " + data.daily[1].humidity + " %";
        getHumidity3 = document.getElementById("humidity3");
        getHumidity3.innerHTML = "Humidity: " + data.daily[2].humidity + " %";
        getHumidity4 = document.getElementById("humidity4");
        getHumidity4.innerHTML = "Humidity: " + data.daily[3].humidity + " %";
        getHumidity5 = document.getElementById("humidity5");
        getHumidity5.innerHTML = "Humidity: " + data.daily[4].humidity + " %";
        // the UV Index
        getUV1 = document.getElementById("uvindex1");
        getUV.innerHTML = "UV Index: " + data.daily[0].uvi;
        getUV2 = document.getElementById("uvindex2");
        getUV2.innerHTML = "UV Index: " + data.daily[1].uvi;
        getUV3 = document.getElementById("uvindex3");
        getUV3.innerHTML = "UV Index: " + data.daily[2].uvi;
        getUV4 = document.getElementById("uvindex4");
        getUV4.innerHTML = "UV Index: " + data.daily[3].uvi;
        getUV5 = document.getElementById("uvindex5");
        getUV5.innerHTML = "UV Index: " + data.daily[4].uvi;
        
      })
      //  var cityId = data.city.id;
      //   console.log(cityId); 
      //   fetch("https://api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&appid=51a61d96cb3c110846e5130afe5ac605")
      //   .then(function(response) {
      //     return response.json();
      //   })
      //   console.log(response);
      //   const getForecast = document.querySelectorAll("forecast");
      //       for (i=0; i < getForecast.length; i++) {
      //           getForecast[i].innerHTML = "";
      //           console.log(getForecast);     
         
      // };
    });

  
});        
};
cityFormEl.addEventListener("submit", formSubmitHandler)

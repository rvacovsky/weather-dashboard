var cityFormEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#container-lg");

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
    console.log(cityInputEl);
    // get value from input element
    var cityName = cityInputEl.value.trim();
  
    if (cityName) {
      getWeather(cityName);
  
      // clear old content
      weatherContainerEl.textContent = "";
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
        });
    });
};

cityFormEl.addEventListener("submit", formSubmitHandler);



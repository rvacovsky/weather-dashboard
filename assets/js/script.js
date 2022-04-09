fetch("api.openweathermap.org/data/2.5/onecall?lat=38.8&lon=12.09&callback=test", {
    })
    .then(response => response.json())
    .then(result => console.log(result));

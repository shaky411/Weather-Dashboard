

// Target the form element
const searchForm = document.getElementById('search-form');

// Listen on the subit of the form
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
// get the value of the search input
    let inputCity = document.getElementById('search-input').value;
    let apiKey = 'efb239de7d746f4bc88b6d592ea228c1'
    let cityURL = `https://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&limit=5&appid=` + apiKey;
    

    fetch(cityURL)
.then(response => response.json())
.then(cityData => {

    let firstCity = cityData[0];

    console.log(firstCity.lat);
    console.log(firstCity.lon);

    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&appid=` + apiKey)

})

.then(response => response.json())
.then(data => {

    console.log(data)
    // Date/Time
    let dateTime = data.list[0].dt
    let dateTimeConvert = moment(dateTime, "X").format("DD/MM/YYYY HH:mm:ss")
    console.log(dateTimeConvert)
    
    // Wind Speed
    console.log("The Wind speed is: " + data.list[0].wind.speed)

    // Weather Description
    console.log("Weather: " + data.list[0].weather[0].description)

    // Icon
    let icon = (data.list[0].weather[0].icon)

    // Weather icon URL
    let weatherIcon = `https://openweathermap.org/img/wn/${icon}@4x.png`
    console.log(weatherIcon)

})

})
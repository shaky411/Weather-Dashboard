

// Target the form element
const searchForm = document.getElementById('search-form');

// Clear searched city input
function clearInput() {
    let clearSearch = document.getElementById('search-input')
    if (clearSearch.value !=="") {
        clearSearch.value = "";
    }
}

// Listen on the subit of the form
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // get the value of the search input
    let inputCity = document.getElementById('search-input').value;
    clearInput();

    let apiKey = 'efb239de7d746f4bc88b6d592ea228c1'
    let cityURL = `https://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&limit=5&appid=` + apiKey;


    fetch(cityURL)
        .then(response => response.json())
        .then(cityData => {

            let firstCity = cityData[0];
            
            let lat = firstCity.lat;
            let lon = firstCity.lon;

            return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=` + apiKey + `&units=metric`)

        })

        .then(response => response.json())
        .then(data => {

            // put a loop here to get city data for 5 days only

            console.log(data)
            let currentCity = data.city.name;
            console.log(currentCity)

            let times = data.list;

            for (let i = 0; i < times.length; i += 8) {
                const time = times[i];
                console.log(time)
            }

            // Date/Time
            let dateTime = data.list[0].dt
            let dateTimeConvert = moment(dateTime, "X").format("DD/MM/YYYY HH:mm:ss")
            console.log(dateTimeConvert)

            // Wind Speed
            console.log("The Wind speed is: " + data.list[0].wind.speed)

            // Temp
            console.log("The temp is " + data.list[0].main.temp + "℃");

            // Weather Description
            let weatherDescription = data.list[0].weather[0].description

            // Icon
            let icon = (data.list[0].weather[0].icon)
            // Weather icon URL
            let weatherIcon = `https://openweathermap.org/img/wn/${icon}@4x.png`
            console.log(weatherIcon)

            let img = document.createElement("img");
            img.src = `https://openweathermap.org/img/wn/${icon}@4x.png`
            let src = document.getElementById('imageHolder');
            src.appendChild(img);

            document.querySelector("#today").append(dateTimeConvert);
            document.querySelector("#city-name").append(currentCity);
            // document.querySelector("#weather-image").append(iconSource);
            // document.querySelector("#forecast").append(weatherDescription);

            
            

        });

})
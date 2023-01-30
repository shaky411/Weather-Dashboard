

// let infoContainer = document.querySelector("#city-name");

// Target the form element
const searchForm = document.getElementById('search-form');

// Clear searched city input
function clearInput() {
    let clearSearch = document.getElementById('search-input')
    if (clearSearch.value !== "") {
        clearSearch.value = "";
    }
}

// Listen on the submit of the form
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    weatherSearch()

})




function weatherSearch() {

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

            console.log(data)

            let windSpeed = ("The Wind speed is: " + data.list[0].wind.speed + "m/s")
            let temp = ("The temp is: " + data.list[0].main.temp + "℃");
            let humidity = data.list[0].main.humidity
            let humidityData = ("The humidity is: " + humidity + "%");
            let currentCity = data.city.name;


            let newDiv = document.createElement("div")
            
            newDiv.innerHTML = (`
            <h1>${currentCity}</h1>
            <p/>${windSpeed}</p>
            <p/>${temp}</p>
            <p/>${humidityData}</p>
            `);

            document.querySelector("#city-name").append(newDiv)

            // let times = data.list;

            // put a loop here to get city data for 5 days only
            // for (let i = 0; i < 5; i++) {

            //     // console.log(time.weather[0])
            //     let temp = data.list[i].main.temp;
            //     let wind = data.list[i].wind.speed;
            //     let date = data.list[((i + 1) * 8) - 1].dt
            //     let dateConvert = moment(date, "X").format("llll")
            //     console.log(dateConvert)
            //     console.log("The temp is: " + temp + "℃")
            //     console.log("The wind speed is: " + wind + "m/s")
            // }

            // Date/Time
            let dateTime = data.list[0].dt
            let dateTimeConvert = moment(dateTime, "X").format("llll")
            console.log(dateTimeConvert)

            // Wind Speed
            

            // Temp
            

            // Weather Description
            let weatherDescription = data.list[0].weather[0].description

            // Humidity
            

            // Icon
            let icon = (data.list[0].weather[0].icon)
            // Weather icon URL
            let weatherIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`
            console.log(weatherIcon)

            let img = document.createElement("img");
            img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
            let src = document.getElementById('imageHolder');
            src.appendChild(img);


            // append 1st day weather card
            document.querySelector("#today").innerHTML = dateTimeConvert;
            // document.querySelector("#city-name").innerHTML = currentCity
            
            // document.querySelector("#weather-image").append(iconSource);
            // document.querySelector("#forecast").append(weatherDescription);

        });

}


const cityNameInput = document.querySelector("#city-name");
// const searchForm = document.querySelector("#search-form");
const currentConditionsUl = document.querySelector("#current-forecast #conditions");

const previousSearches = document.querySelector("#previous-searches");
const previousSearchContainer = document.querySelector("#previous-searches .card-body");
const dailyCardContainer = document.querySelector("#daily-forecast");
const fiveDayHeader = document.querySelector("#five-day");

// let infoContainer = document.querySelector("#city-name");

// Current weather header
const cardHeader = document.querySelector("#current-forecast h3");
// Target the form element
const searchForm = document.getElementById('search-form');
// const cardHeader = document.querySelector('card-header');
const cityArray = [];

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

    // newDiv.innerHTML = "";
    weatherSearch()
})


function weatherSearch() {
    // get the value of the search input
    
    let inputCity = document.getElementById('search-input').value;
    
    // Clears search input
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

            // Data pulled from api call

            let windSpeed = ("The Wind speed is: " + data.list[0].wind.speed + "m/s")
            let temp = ("The temp is: " + data.list[0].main.temp + "℃");
            let humidity = data.list[0].main.humidity
            let humidityData = ("The humidity is: " + humidity + "%");
            let currentCity = data.city.name;
            // date/time
            let dateTime = data.list[0].dt
            let dateTimeConvert = moment(dateTime, "X").format("llll")
            console.log(dateTimeConvert)
            // Icon
            let icon = (data.list[0].weather[0].icon)
            // Weather icon URL
            let weatherIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`
            console.log(weatherIcon)

            cardHeader.innerHTML = currentCity + " (" + dateTimeConvert + ")" + `<img class="city-icon" src=${weatherIcon} alt="Weather logo">`
            
            const listArray = [];

            for (let i = 0; i < 3; i++) {
                const li = document.createElement("li");
                li.classList.add("mb-2");
                listArray.push(li);
            }

            listArray[0].innerHTML = temp;
            listArray[1].textContent = humidityData;
            listArray[2].textContent = windSpeed;
            
            listArray.forEach(li => {
                currentConditionsUl.append(li);
            })
            // document.querySelector("#conditions").append(newList)

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
            

            // Weather Description
            let weatherDescription = data.list[0].weather[0].description

        });

}


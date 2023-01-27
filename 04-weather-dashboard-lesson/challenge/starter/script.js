


let testBtn = document.getElementById('test-btn');
testBtn.addEventListener('click', getApi);

let queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=51.454514&lon=-2.587910&appid=efb239de7d746f4bc88b6d592ea228c1`;


function getApi() {

    console.log("Button Clicked!");

    fetch(queryURL)
        .then(response => response.json())
        .then(function (response) {

            console.log(response);
            console.log("===============================");
            console.log("City: " + response.city.name);
            console.log("===============================");
            console.log(response.list[0].weather[0].description);
            console.log(response.list[0].weather[0].main);

            // let results = response.results;

            // console.log(response.results)

        })

};
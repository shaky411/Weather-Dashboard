



let clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', clearSearch);

let searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', getApi);

let queryURL = 'https://newsdata.io/api/1/news?apikey=pub_16093f30f1a74ee0a9310df8ca855e37e8b3c&q=tech&country=gb,us&language=en&category=technology'

function getApi() {


    // console.log("Button Clicked!");

    fetch(queryURL)
        .then(response => response.json())
        .then(function (response) {


            let results = response.results;

            // console.log(response.results)
            console.log("============================")

            for (let i = 0; i < results.length; i++) {
                // let articlesDiv = $('div')

                console.log(results[i])

                let newDiv = document.createElement("div");

                newDiv.innerHTML = `<p>${results[i].title}</p><span>${results[i].source_id}</span>`;
                let title = results[i].title;

                document.querySelector('#article-section').append(newDiv)
            }

        })
}



function clearSearch() {
    console.log("test")


}



// fetch(queryURL)
// .then(response => response.json())
// .then(function (response) {

// })
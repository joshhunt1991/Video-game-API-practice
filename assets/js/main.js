// Runs the getGames function when you click the submit button on the search bar taking in searchText as a parameter

$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getGames(searchText);
        e.preventDefault();
    });
});

// Retrieves a list of games from the API based on the search text entered and submitted in the search Bar 
// and post them on the index page. Searches for strings.

function getGames(searchText) {

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://rapidapi.p.rapidapi.com/games?search=" + searchText,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
            "x-rapidapi-key": "e820b60717mshf9de36d3c2a66b8p16a209jsnbbb441546d84"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        let games = response;
        let gamesResults = games.results;

        let output = '';
        $.each(gamesResults, (key, game) => {
            console.log(key, game);
            output += `
            <div class="col-lg-4 col-md-6 no-padding">
                <div class="text-center">
                    <img class="thumbnails" src="${game.background_image}">
                    <h5>${game.name}</h5>
                    <p>Metacritic score - ${game.metacritic}</p>
                    <a onclick="gameSelected('${game.id}')" class="btn btn-success detail-btn href="#">Game Details</a>
                </div>
            </div>`
            document.getElementById("gamediv").innerHTML = output;
        });
    })

        .catch((err) => {
            console.log(err);
        });
}

// saves the session id to carry over to the game.html page opens the page when you click the game details button

function gameSelected(id) {
    sessionStorage.setItem('gameID', id);
    window.location = 'game.html';
    return false;
}

// transfers the object of the selected game to the game.html page and displays the data onto the page

function getGame() {
    let gameID = sessionStorage.getItem('gameID');
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://rapidapi.p.rapidapi.com/games/" + gameID,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
            "x-rapidapi-key": "e820b60717mshf9de36d3c2a66b8p16a209jsnbbb441546d84"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);

        // create game dev name array 

        let selectedGame = response;
        let gameDevs = selectedGame.developers;
        let devNameArray = [];
        gameDevs.forEach(function (devs) {

            let devNames = devs.name;
            devNameArray.push(devNames);
        });

        console.log(`ARRAY + ${devNameArray}`);

        // create ratings count array

        let gameRatings = selectedGame.ratings;
        let ratingsObj = [];

        gameRatings.forEach(function (rate) {

            let ratingCount = rate.count;
            ratingsObj.push(ratingCount);
            ratingsArray = Object.values(ratingsObj);
        });

        // create ratings title array

        let gameRatingsTitles = selectedGame.ratings;
        let rateTitleObj = [];

        gameRatingsTitles.forEach(function (rate2) {

            let ratingTitle = rate2.title;
            rateTitleObj.push(ratingTitle);
            rateTitleArray = Object.values(rateTitleObj);
        });

        console.log(`ARRAY + ${rateTitleArray}`);
        console.log(rateTitleArray);


        // add  chart
        var ctx = document.getElementById('chart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: rateTitleArray,
                datasets: [{
                    label: '# of Votes',
                    data: ratingsArray,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });


        // record game info to output variable

        let output = `
            <div class="no-padding">
                <div class="text-center game-width">
                    <h2>${selectedGame.name}</h2>
                    <img class="game-image" src="${selectedGame.background_image}">
                    <p>Description - ${selectedGame.description}</p>
                    <p>Developers - ${devNameArray}</p>
                    <p>Released - ${selectedGame.released}</p>
                    <p>Metacritic score - ${selectedGame.metacritic}</p>                  
                </div>
            </div>`
        document.getElementById("selected-div").innerHTML = output;




    })
        .catch((err) => {
            console.log(err);
        });
}



function randomGames() {

let randomID = Math.floor(Math.random() * 462141) + 1;
console.log(randomID);
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://rapidapi.p.rapidapi.com/games/" + randomID,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
            "x-rapidapi-key": "e820b60717mshf9de36d3c2a66b8p16a209jsnbbb441546d84"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        let randomGame = response;

        let output =`
            <div class="no-padding no-margins">
                <div class="text-center">
                    <img class="random-thumbnails" src="${randomGame.background_image}">
                    <h5>${randomGame.name}</h5>
                    <p>Metacritic score - ${randomGame.metacritic}</p>
                    <a onclick="gameSelected('${randomGame.id}')" class="btn btn-success detail-btn href="#">Game Details</a>
                </div>
            </div>`
            document.getElementById("randomGamediv").innerHTML = output;

    })

        .catch((err) => {
            console.log(err);
        });
}

function randomGames2() {

let randomID = Math.floor(Math.random() * 462141) + 1;
console.log(randomID);
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://rapidapi.p.rapidapi.com/games/" + randomID,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
            "x-rapidapi-key": "e820b60717mshf9de36d3c2a66b8p16a209jsnbbb441546d84"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        let randomGame = response;

        let output =`
            <div class="no-padding no-margins">
                <div class="text-center">
                    <img class="random-thumbnails" src="${randomGame.background_image}">
                    <h5>${randomGame.name}</h5>
                    <p>Metacritic score - ${randomGame.metacritic}</p>
                    <a onclick="gameSelected('${randomGame.id}')" class="btn btn-success detail-btn href="#">Game Details</a>
                </div>
            </div>`
            document.getElementById("randomGamediv2").innerHTML = output;

    })

        .catch((err) => {
            console.log(err);
        });
}

function randomGames3() {

let randomID = Math.floor(Math.random() * 462141) + 1;
console.log(randomID);
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://rapidapi.p.rapidapi.com/games/" + randomID,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
            "x-rapidapi-key": "e820b60717mshf9de36d3c2a66b8p16a209jsnbbb441546d84"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        let randomGame = response;

        let output =`
            <div class="no-padding no-margins">
                <div class="text-center">
                    <img class="random-thumbnails" src="${randomGame.background_image}">
                    <h5>${randomGame.name}</h5>
                    <p>Metacritic score - ${randomGame.metacritic}</p>
                    <a onclick="gameSelected('${randomGame.id}')" class="btn btn-success detail-btn href="#">Game Details</a>
                </div>
            </div>`
            document.getElementById("randomGamediv3").innerHTML = output;

    })

        .catch((err) => {
            console.log(err);
        });
}



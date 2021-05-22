
var searchBtn = document.querySelector(".searchBtn");
var weatherContainer = document.querySelector(".weatherContainer");

function getData (searchTerm){

var searchTerm = document.querySelector("#searchTerm").value;
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm +  "&appid=95692f2c0e1a1b5e25327de5d590734c";

// 5 days forecats- api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
        response.json().then(function(data) {
            console.log(data)
        var header = document.createElement("h3")
        header = searchTerm;
        var icon = document.createElement("p")
        weatherContainer.innerHTML= data.main.temp;
        weatherContainer.append(header);
       
          });
        } else {
          alert("Error: " + response.statusText);
        }
      });
    };

searchBtn.addEventListener("click", getData);
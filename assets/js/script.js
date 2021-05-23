


var searchBtn = document.querySelector(".searchBtn");
var weatherContainer = document.querySelector(".weatherContainer");
var dailyForecats = document.querySelector (".dailyForecat");
var temperature = document.querySelector(".temp");
var humidity = document.querySelector(".humidity");
var wind = document.querySelector(".wind");
var imageDaily = document.querySelector(".imageD");
var searchList = document.querySelector(".searchList");

var forecast = document.querySelector(".forecast");

// Create a local storage array to store search items
var storage = JSON.parse(localStorage.getItem('searchList')) || [];




function createPage(data){
  imageDaily.innerHTML = "";
  var icon = data.weather[0].icon;
  var lat = data.coord.lat;
  var long = data.coord.lon;

  var iconUrl = "http://openweathermap.org/img/w/"+ icon +".png";
  var image_d = document.createElement("img");
  image_d.src = iconUrl;

  var uvUrl = `https://api.openweathermap.org/data/2.5/solar_radiation?lat=${lat}&lon=${long}&appid=95692f2c0e1a1b5e25327de5d590734c`
  console.log(uvUrl);

var date = moment(data.dt*1000).format("DD MMM YYYY");
var cityData = data.name + " - " + date + " - " ;
imageDaily.appendChild(image_d);

  weatherContainer.innerHTML = `<h2> ${cityData} </h2>`;
  temperature.innerHTML= "Temperature : " + data.main.temp + " K"
  humidity.innerHTML = " Humidity : " + data.main.humidity + " %"
  wind.innerHTML = " Wind : " + data.wind.speed + " MPH"

  // store search values in the array initially created 
  storage.push(data.name);
  storage.reverse();
  storage.splice(10);

  // set values to the to the storage after making it string


  searchList.innerHTML = "" ;
  for(var i = 0; i< storage.length; i++){
    searchList.innerHTML += `<button id=${i}>  ${storage[i]}  </button>` ;
  }
  storage.reverse();
  localStorage.setItem('searchList', JSON.stringify(storage));
}


function getData (searchTerm){
var searchTerm = document.querySelector("#searchTerm").value;
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm +  "&appid=95692f2c0e1a1b5e25327de5d590734c";

//var apiUrlFive = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${searchTerm}&cnt=${5}&appid=dd622459b78841be1f2f087475975477`;

fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
        response.json().then(function(data) {
            console.log(data)
          createPage(data)
          });
        } else {
          alert("Error: " + response.statusText);
        }
      });

/*fetch(apiUrlFive).then(function(response) {
      // request was successful
      if (response.ok) {
          response.json().then(function(data) {
              console.log(data)         
            });
          } else {
            alert("Error: " + response.statusText);
          }
        });
*/

  



      };

searchBtn.addEventListener("click", getData);
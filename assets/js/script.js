


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

function createForecastPage(data)  {
  forecast.innerHTML = "";
  for(var i = 0; i< data.list.length; i++){
    var icon = data.list[i].weather[0].icon;
    var iconForeUrl = "http://openweathermap.org/img/w/"+ icon +".png";  // get the icon link
    var date = moment(data.list[i].dt*1000).format("DD MMM YYYY");

    var image_f = document.createElement("img"); // create and img to house the icon
      image_f.src = iconForeUrl; //Add the icon url to the img
    var foreEl = document.createElement("div");
      foreEl.classList = "bg-secondary text-white divInline";
    var dt = document.createElement("p");
      dt.textContent = date;
    var pTemp = document.createElement("p");
      pTemp.textContent = "Temperature :" + data.list[i].main.temp;
    var pHum = document.createElement("p");
      pHum.textContent = "Humidity :" +data.list[i].main.humidity;
    var pWind = document.createElement("p");
      pWind.textContent = "Wind :" +data.list[i].wind.speed;
    foreEl.appendChild(dt);
    foreEl.appendChild(image_f);
    foreEl.appendChild(pTemp);
    foreEl.appendChild(pHum);
    foreEl.appendChild(pWind);
    forecast.appendChild(foreEl);
  }

};


function createDailyPage(data){
  imageDaily.innerHTML = "";
  var icon = data.weather[0].icon;

  var iconUrl = "http://openweathermap.org/img/w/"+ icon +".png";  // get the icon link
  var image_d = document.createElement("img"); // create and img to house the icon
  image_d.src = iconUrl; //Add the icon url to the img

// header section gets city name, date and icon
  var date = moment(data.dt*1000).format("DD MMM YYYY");
  var cityData = data.name + " - " + date + " - " ; 
  imageDaily.appendChild(image_d); // add the image to the header 

  // city name, date and icon is represented on the html 
  weatherContainer.innerHTML = `<h2> ${cityData} </h2>`;

  temperature.innerHTML= "  Temperature : " + data.main.temp + " K";
  humidity.innerHTML = "  Humidity : " + data.main.humidity + " %";
  wind.innerHTML = "  Wind : " + data.wind.speed + " MPH";
// 5 day forecats code here
 




  // store search values in the array initially created 
  storage.push(data.name);
  storage.reverse();
  storage.splice(10);

  // set values to the to the storage after making it string


  searchList.innerHTML = "" ;
  for(var i = 0; i< storage.length; i++){
    searchList.innerHTML += `<button class ="btnDist btn btn-secondary btn-sm" id=${i}>  ${storage[i]}  </button>` ;
  }
  storage.reverse();
localStorage.setItem('searchList', JSON.stringify(storage));
}


function getData (searchTerm){
var searchTerm = document.querySelector("#searchTerm").value;
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm +  "&appid=95692f2c0e1a1b5e25327de5d590734c";
var apiUrlFive = `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=dd622459b78841be1f2f087475975477`;

fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
        response.json().then(function(data) {
            console.log(data)
          createDailyPage(data)
          });
        } else {
          alert("Error: " + response.statusText);
        }
      });

fetch(apiUrlFive).then(function(response) {
      // request was successful
      if (response.ok) {
          response.json().then(function(data) {
              console.log(data)
              createForecastPage(data)         
            });
          } else {
            alert("Error: " + response.statusText);
          }
        });
      };
searchBtn.addEventListener("click", getData);
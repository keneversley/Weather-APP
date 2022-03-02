var apiKey = "f6c5d7cbd0d5568f87958350a76eb74d";

$(document).ready(function () {

    // search for city 
    $('#getEnteredCityWeather,#past-searches').on('click', function (event) {
  
          // user puts location and get's history 
          
          let clickEvent = $(event.target)[0];
          console.log(clickEvent)
          let location = "";
          if (clickEvent.id === "getEnteredCityWeather" || clickEvent.id === "getWeatherIcon") {
            location = $('#cityEntered').val().trim().toUpperCase();
          } else if ( clickEvent.className === ("cityList") ) {
            location = clickEvent.innerText;
          }
          if (location == "") return;
          console.log(location)
  
          // update  search
          // saving the location to local storage
          updateLocalStorage (location);
          
          // weather for searched location, pass location
          getCurrentWeather(location);
          
          // forecast for searched location, pass location
          getForecastWeather(location);
         });
         function updateLocalStorage(location){
           console.log("Hello")
           location
         }
          function getCurrentWeather(loc){
            console.log("current")
            loc
            let apilink = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${"f6c5d7cbd0d5568f87958350a76eb74d"}`
            fetch(apilink)
            .then(function(res){
              return res.json()
            })
            .then(function(res){
              console.log(res)
            })
          }
          function getForecastWeather(location){
            console.log("forecast")
          }

      //  MMM DD, YYYY format
      function convertDate(UNIXtimestamp) {
        let convertedDate = "";
        let a = new Date(UNIXtimestamp * 1000);
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        convertedDate = month + ' ' + date + ', '+ year;
        return convertedDate;
      }
    })


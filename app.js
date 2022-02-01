var apiKey = "f6c5d7cbd0d5568f87958350a76eb74d";

$(document).ready(function () {

    // search for city 
    $('#getEnteredCityWeather,#past-searches').on('click', function () {
  
          // user puts location and get's history 
          
          let clickEvent = $(event.target)[0];
          let location = "";
          if (clickEvent.id === "getEnteredCityWeather") {
            location = $('#cityEntered').val().trim().toUpperCase();
          } else if ( clickEvent.className === ("cityList") ) {
            location = clickEvent.innerText;
          }
          if (location == "") return;
  
          // update  search
          updateLocalStorage (location);
          
          // weather for searched location, pass location
          getCurrentWeather(location);
          
          // forecast for searched location, pass location
          getForecastWeather(location);
         });
  
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
  
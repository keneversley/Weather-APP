
    // WEATHER

    
    var apiKey = "f6c5d7cbd0d5568f87958350a76eb74d";

    $(document).ready(function () {
    
        // On click of Search or city list
        $('#getEnteredCityWeather,#past-searches').on('click', function () {
      
              //  input if seearch event
             
              let clickEvent = $(event.target)[0];
              let location = "";
              if (clickEvent.id === "getEnteredCityWeather") {
                location = $('#cityEntered').val().trim().toUpperCase();
              } else if ( clickEvent.className === ("cityList") ) {
                location = clickEvent.innerText;
              }
              if (location == "") return;
      
              // update local storage with new city search
              updateLocalStorage (location);
              
              
              getCurrentWeather(location);
              
           
              getForecastWeather(location);
             });
      
       
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
      
          function updateLocalStorage(location) {
             // update City in local storage
             let cityList = JSON.parse(localStorage.getItem("cityList")) || [];
             cityList.push(location); 
             cityList.sort();
      
             // removes dulicate cities from saved searches
             for (let i=1; i<cityList.length; i++) {
                 if (cityList[i] === cityList[i-1]) cityList.splice(i,1);
             }
             //stores in local storage
             localStorage.setItem('cityList', JSON.stringify(cityList));
      
             $('#cityEntered').val("");
          }
      
        });
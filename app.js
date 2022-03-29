
    // WEATHER

    
    var apiKey = "f6c5d7cbd0d5568f87958350a76eb74d";
    
 
    $(document).ready(function () {
        /*
        var getEnteredCityWeather = document.querySelector('#getEnteredCityWeather');
        getEnteredCityWeather.addEventListener('click', function(event) {
      var search = document.querySelector('#getWeatherIcon').value;
      fetch('https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q='+ search +'&appid=f6c5d7cbd0d5568f87958350a76eb74d&units=imperial') 

  .then(function(res){
      return res.json();
  })
  .then(function(data){
      console.log(data);
      document.querySelector('#searchresults').textContent =data.main.temp;
  }) 
});
   */


    
        //  Search or city list
        $('#getEnteredCityWeather,#past-searches').on('click', function () {
      
              // search event
             
             let clickEvent = $(event.target)[0];
              let location = "";
              if (clickEvent.id === "getEnteredCityWeather") {
                location = $('#cityEntered').val().trim().toUpperCase();
              } else if ( clickEvent.className === ("cityList") ) {
                location = clickEvent.innerText;
              }
              if (location == "") return;
             
      
              // local storage with new city search
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
             //City in local storage
             let cityList = JSON.parse(localStorage.getItem("cityList")) || [];
             cityList.push(location); 
             cityList.sort();
      
             // removes dulicate cities from 
             for (let i=1; i<cityList.length; i++) {
                 if (cityList[i] === cityList[i-1]) cityList.splice(i,1);
             }
             //stores in local storage
             localStorage.setItem('cityList', JSON.stringify(cityList));
      
             $('#cityEntered').val("");
          }

          // current  location
          function establishCurrLocation() {
              
            // set location 
              let location = {};
              
              // get latitude and longitude
              function success(position) {
                location = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  success: true
                }
            
                //  current conditions for current 
                getCurrentWeather(location);
            
                
                getForecastWeather(location);
              }
            
              
              function error() {
                location = { success: false }
                return location;
              }
            
              
              if (!navigator.geolocation) {
                console.log('Geolocation is not supported by your browser');
              } else {
                navigator.geolocation.getCurrentPosition(success, error);
              }
            }
      
          
          function getCurrentWeather(loc) {
              
             
              let cityList = JSON.parse(localStorage.getItem("cityList")) || [];
              
             
              $('#past-searches').empty();
              
              // calls for each row of the CityList array
              cityList.forEach ( function (city) {  
                let cityHistoryNameDiv = $('<div>');      
                cityHistoryNameDiv.addClass("cityList");         
                cityHistoryNameDiv.attr("value",city);
                cityHistoryNameDiv.text(city);
                $('#past-searches').append(cityHistoryNameDiv);
              });      
              
              // reset search 
              $('#city-search').val("");
            
             
              if (typeof loc === "object") {
                city = `lat=${loc.latitude}&lon=${loc.longitude}`;
              } else {
                city = `q=${loc}`;
              }
            
              // Set up Open Weather API Query - weather request 
              var currentURL = "https://api.openweathermap.org/data/2.5/weather?";
              var cityName = city;
              var unitsURL = "&units=imperial";
              var apiIdURL = "&appid="
              var apiKey = "f6c5d7cbd0d5568f87958350a76eb74d";
              var openCurrWeatherAPI = currentURL + cityName + unitsURL + apiIdURL + apiKey;
            
              // Open weather API query - weather request
              $.ajax({
                  url: openCurrWeatherAPI,
                  method: "GET"
              }).then(function (response1) {
            
                // load result 
              weatherObj = {
                  city: `${response1.name}`,
                  wind: response1.wind.speed,
                  humidity: response1.main.humidity,
                  temp: Math.round(response1.main.temp),
            
                  // convert date to usable format [1] = MM/DD/YYYY Format
                  date: (convertDate(response1.dt)),
                  icon: `http://openweathermap.org/img/w/${response1.weather[0].icon}.png`,
                  desc: response1.weather[0].description
              }
              
              // current waeather
        
                $('#forecast').empty(); 
                // current search city
                $('#cityName').text(weatherObj.city + " (" + weatherObj.date + ")");
                // current  weather icon
                $('#currWeathIcn').attr("src", weatherObj.icon);
                //  city temp
                $('#currTemp').text("Temperature: " + weatherObj.temp + " " +  "°F");
                // humidity
                $('#currHum').text("Humidity: " + weatherObj.humidity + "%");
                //search wind speed
                $('#currWind').text("Windspeed: " + weatherObj.wind + " MPH");      
            
              // get UVI from open weather using UVI 
              city = `&lat=${parseInt(response1.coord.lat)}&lon=${parseInt(response1.coord.lon)}`;
              
              // Initiate API Call to get current weather... use UVI request
              var uviURL = "https://api.openweathermap.org/data/2.5/uvi";
              var apiIdURL = "?appid="
              var apiKey = "f6c5d7cbd0d5568f87958350a76eb74d";
              var cityName = city;
              var openUviWeatherAPI = uviURL + apiIdURL + apiKey + cityName;
              
              // open weather call... UVI request
              $.ajax({
                  url: openUviWeatherAPI,
                  method: "GET"
              }).then(function(response3) {
              
                  // load respone into UviLevel variable
                  let UviLevel = parseFloat(response3.value);
                
                  
                  let backgrdColor = 'violet';        
                  // determine backgrouind color depending on value
                  if (UviLevel < 3) {backgrdColor = 'green';} 
                      else if (UviLevel < 6) { backgrdColor = 'yellow';} 
                      else if (UviLevel < 8) { backgrdColor = 'orange';} 
                      else if (UviLevel < 11) {backgrdColor = 'red';}     
              
                  
                  let uviTitle = '<span>UV Index: </span>';
                  let color = uviTitle + `<span style="background-color: ${backgrdColor}; padding: 0 7px 0 7px;">${response3.value}</span>`;
                  $('#currUVI').html(color);            
                  });
              });
          }
      
          // get weather forecast for selected city
          function getForecastWeather(loc) {
      
              // determiing the type of request.. if an object, we have lat/lon, use it
              if (typeof loc === "object") {
                  city = `lat=${loc.latitude}&lon=${loc.longitude}`;      
              // else call api using city name 
              } else {
                  city = `q=${loc}`; }
              
              // Set up Open Weather API Query - weather request 
              var currentURL = "https://api.openweathermap.org/data/2.5/weather?";
              var cityName = city;
              var unitsURL = "&units=imperial";
              var apiIdURL = "&appid="
              var apiKey = "f6c5d7cbd0d5568f87958350a76eb74d";
              var openCurrWeatherAPI2 = currentURL + cityName + unitsURL + apiIdURL + apiKey;
              
              // Open weather API query - weather request
              $.ajax({
                  url: openCurrWeatherAPI2,
                  method: "GET",
              }).then(function (response4) {
      
              // lat/lon 
              var cityLon = response4.coord.lon;
              var cityLat = response4.coord.lat;
              
              // set city with lat/long
              city = `lat=${cityLat}&lon=${cityLon}`;
              
              // Get five days of weather history using longitude and latitude
              let weatherArr = [];
              let weatherObj = {};
      
              // Initiate API Call to get current weather
              var currentURL = "https://api.openweathermap.org/data/2.5/onecall?";
              var cityName = city;
              
              var exclHrlURL = "&exclude=hourly";
              var unitsURL = "&units=imperial";
              var apiIdURL = "&appid=";
              var apiKey = "f6c5d7cbd0d5568f87958350a76eb74d" ;
              var openFcstWeatherAPI = currentURL + cityName + exclHrlURL + unitsURL + apiIdURL + apiKey;
      
              // Open weather api... onecall request
              $.ajax({
                  url: openFcstWeatherAPI,
                  method: "GET"
              }).then(function (response2) {
              
                // load weatherObj from response... only a history of 5 days needed
                for (let i=1; i < (response2.daily.length-2); i++) {
                  let cur = response2.daily[i]
                  weatherObj = {
                      weather: cur.weather[0].description,
                      icon: `http://openweathermap.org/img/w/${cur.weather[0].icon}.png`,
                      minTemp: Math.round(cur.temp.min),
                      maxTemp: Math.round(cur.temp.max),
                      humidity: cur.humidity,
                      uvi: cur.uvi,
               
                      // convert date to usable format [1] = MM/DD/YYYY Format
                      date: (convertDate(cur.dt))
                  }
                  // push day to weatherArr
                  weatherArr.push(weatherObj);
                }
                // render forecast on page
                // one iteration for each day of forecast history
                for (let i = 0; i < weatherArr.length; i++) {
                  let $colmx1 = $('<div class="col mx-1">');
                  let $cardBody = $('<div class="card-body forecast-card">');
                  let $cardTitle = $('<h6 class="card-title">');
                 
                  $cardTitle.text(weatherArr[i].date);
      
                  // format HTML UL Tag
                  let $ul = $('<ul>'); 
               
                  // format HTML LI Tags
                  let $iconLi = $('<li>');
                  let $iconI = $('<img>');
                  let $weathLi = $('<li>');
                  let $tempMaxLi = $('<li>');
                  let $tempMinLi = $('<li>');
                  let $humLi = $('<li>');
      
                 
                  $iconI.attr('src', weatherArr[i].icon);
                  $weathLi.text(weatherArr[i].weather);                
                  $tempMaxLi.text('Temp High: ' + weatherArr[i].maxTemp + " °F");
                  $tempMinLi.text('Temp Low: ' + weatherArr[i].minTemp + " °F");
                  $humLi.text('Humidity: ' + weatherArr[i].humidity + "%");
      
                 
                  $iconLi.append($iconI);
                  $ul.append($iconLi);
                  $ul.append($weathLi);         
                  $ul.append($tempMaxLi);
                  $ul.append($tempMinLi);
                  $ul.append($humLi);
                  $cardTitle.append($ul);
                  $cardBody.append($cardTitle);
                  $colmx1.append($cardBody);
      
                  $('#forecast').append($colmx1);
                }
              });
            });        
          }
          
      
          // will get location when page OPENS
          var location = establishCurrLocation();
      
        });
       
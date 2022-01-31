
  var searchBtn = document.querySelector('#searchbtn');
  searchbtn.addEventListener('click', function(event) {
      var search = document.querySelector('#searchinput').value;
      fetch('https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q='+ search +'&appid=f6c5d7cbd0d5568f87958350a76eb74d&units=imperial') 
  
  .then(function(res){
      return res.json();
  })
  .then(function(data){
      console.log(data);
      document.querySelector('#searchresults').textContent =data.main.temp;
  }) 
});



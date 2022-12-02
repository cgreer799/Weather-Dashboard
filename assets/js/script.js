let apikey = "91c8754679a350959d15296d5f38bd1a"
var search = function (city){
    console.log(city);
    var apiurl = 'http://api.openweathermap.org/geo/1.0/direct?q='+city+',US&limit=5&units=imperial&appid=' + apikey;
    fetch(apiurl)
    .then(function (response){
        if (response.ok) {
            response.json().then(function (data) {
            console.log(data)
            getforecast(data);        
            });
        }
    })
};

var getforecast = function (location){
    console.log(location);
    
    let lat = location[0].parseJSON(lat);
    let lon = location[0].lon;
    console.log(lat);
    console.log(lon);
    var apiurl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + 'units=imperial&appid=' + apikey;
    fetch(apiurl)
    .then(function (response){
        if (response.ok) {
            console.log(response)
            response.json()
            .then(function (data) {
                console.log(data)
                currentforecast(data, searchcity);
                //display5day(data);
            });
        }
    });
    
};

var currentforecast = function (apiinfo, city){
    const forecast = JSON.parse(apiinfo);
    let f = forecast.list;
    var currdate = new Date(f[0].dt_txt);
    console.log(forecast);
    console.log(f);
    console.log(currdate);
    document.getElementById("city&date&icon").value = city+' ('+currdate.getMonth()+"/"+currdate.getDay()+"/"+currdate.getFullYear+") "+
    "http://openweathermap.org/img/w/" + f[0].Weather[0].icon + ".png";
    document.getElementById("currtemp").value = "Temp:" +f[0].main.temp+"°F";
    document.getElementById("currwind").value = "Wind:" +f[0].wind.speed+" MPH";
    document.getElementById("currhumidity").value = "Humidity: "+ f[0].main.humidity+" %";
};
    
var clickEventHandler = function(event){
    event.preventDefault();
    var searchcity = $('#searchinput').val();
    console.log(searchcity);
    search(searchcity);
};

$('.btn').on('click', clickEventHandler);


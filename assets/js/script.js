let apikey = "91c8754679a350959d15296d5f38bd1a"
function search(){
    var searchinput = document.getElementById("searchinput").ariaValueText;

    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + searchinput + ',US&limit=5&appid=' + apikey+"&units=imperial")
    .then(function (response){
        const j = response.json();
        return j;
    });
    const pj = JSON.parse(j);
    let lat = pj.lat;
    let lon = pj.lon;

    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apikey+"&units=imperial")
    .then(function (response){
        const forecastjson = response.json();
        return forecastjson;
    });
    const forecast = JSON.parse(forecastjson);
    let f = forecast.list;
    var currdate = new Date(f[0].dt_txt);

    document.getElementById("city&date&icon").innerText = searchinput+' ('+currdate.getMonth()+"/"+currdate.getDay()+"/"+currdate.getFullYear+") "+
    "http://openweathermap.org/img/w/" + f[0].Weather[0].icon + ".png";
    document.getElementById("currtemp").innerText = "Temp:" +f[0].main.temp+"°F";
    document.getElementById("currwind").innerText = "Wind:" +f[0].wind.speed+" MPH";
    document.getElementById("currhumidity").innerText = "Humidity: "+ f[0].main.humidity+" %";
};


document.getElementById("searchbutton").addEventListener("click", search);


var searchhistory = document.getElementById('searchistory');

let apikey = "91c8754679a350959d15296d5f38bd1a"
function search(){
    var searchinput = document.getElementById("searchinput").ariaValueText;

    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + searchinput + ',US&limit=5&appid=' + apikey)
    .then(function (response){
        const j = response.json();
        return j;
    });
    const pj = JSON.parse(j);
    let lat = pj.lat;
    let lon = pj.lon;

    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apikey)
    .then(function (response){
        const forecastjson = response.json();
        return forecastjson;
    });
    
};


document.getElementById("searchbutton").addEventListener("click", search);


var searchhistory = document.getElementById('searchistory');

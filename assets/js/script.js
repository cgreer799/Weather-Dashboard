let apikey = "91c8754679a350959d15296d5f38bd1a"
var searches = JSON.parse(localStorage.getItem('savedSearches'))|| [];
console.log(searches)
var city = $('#searchinput').val();

var storeSearches = function(){
    var city = $('#searchinput').val();
    searches.push(city);
    var unique = [];
    $.each(searches, function(i, el){
        if($.inArray(el, unique) === -1) unique.push(el);
    });
    searches = unique;
    localStorage.setItem("savedSearches", JSON.stringify(searches));
};

//funciton populates previous searches below search input box
var populateSearches = function(){
    for (i = 0; i < searches.length; i++){
        $('#searchhistorybutton'+i).text(searches[i]);
    }
};
var search = function (city){
    console.log(city);
    var apiurl = 'https://api.openweathermap.org/geo/1.0/direct?q='+city+',US&limit=5&units=imperial&appid=' + apikey;
    fetch(apiurl)
    .then(function (response){
        if (response.ok) {
            response.json().then(function (data) {
            console.log(data)
            getforecast(data);
            storeSearches();
            populateSearches();
            });
        }
    })
};

var getforecast = function (location){
    console.log(location);
    
    let lat = location[0].lat;
    let lon = location[0].lon;
    console.log(lat);
    console.log(lon);
    var apiurl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apikey;
    fetch(apiurl)
    .then(function (response){
        if (response.ok) {
            console.log(response)
            response.json()
            .then(function (data) {
                console.log(data)
                currentforecast(data, $('#searchinput').val());
                //display5day(data);
            });
        }
    });
    
};

var currentforecast = function (apiinfo, city){
    const forecast = apiinfo;
    let f = forecast.list;
    var currdate = new Date(f[0].dt_txt);
    console.log(forecast);
    console.log(f);
    console.log(currdate);
    console.log("Icon: "+f[0].weather[0].icon);
    $('#city-date').text(city+" "+currdate)
    $('#icon').prop('src',"https://openweathermap.org/img/w/"+ f[0].weather[0].icon +".png"); 
    $('#currtemp').text("Temp: " +f[0].main.temp+"°F");
    $('#currwind').text("Wind: " +f[0].wind.speed+" MPH");
    $('#currhumidity').text("Humidity: "+ f[0].main.humidity+" %");
};
    
var clickEventHandler = function(event){
    event.preventDefault();
    var searchcity = $('#searchinput').val();
    console.log(searchcity);
    search(searchcity);
};

$('.btn').on('click', clickEventHandler);



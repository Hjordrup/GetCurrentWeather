let form = document.querySelector('#btnSearch'); 
form.addEventListener('click' , getWeather); 


// Indsæt API nøgle her  under=> 
const apiKey = '';  

let cityNameText = document.getElementById('cityNameText'); 
let weatherState = document.getElementById('weatherState'); 
let weatherStatusPic = document.getElementById('weatherPic'); 
let temperature = document.getElementById('mainTemp'); 
let feelsLikeTemperature = document.getElementById('feelsLike'); 
let humidity = document.getElementById('humidity'); 
let windspeed = document.getElementById('windSpeed');
let conID = document.getElementById('containerID'); 
async function getWeather (event ){
    
    event.preventDefault(); 
    let input = document.getElementById('cityName');
    let city = input.value;
    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`); 
    let weather = await response.json(); 
    
    if(weather.weather == undefined){
        alert("This city can not be found check spelling "); 
        return; 
    }
    
    cityNameText.innerHTML = weather.name; 
    weatherState.innerHTML = weather.weather[0].description; 
    weatherStatusPic.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    let currentTemp = (weather.main.temp - 273.15).toFixed(2); 
    let feelsLikeTemp = (weather.main.feels_like - 273.15).toFixed(2); 
    temperature.innerHTML = `The current temperature is ${currentTemp} °C`; 
    feelsLikeTemperature.innerHTML = `The temperature feels like ${feelsLikeTemp} °C`
    humidity.innerHTML = `The current humidity is ${weather.main.humidity} %`
    windspeed.innerHTML = `The current wind speed is ${weather.wind.speed} m/s`  
    forecastData(weather); 
    conID.style.opacity = '100%'; 
}




async function forecastData(latAndLon){
let days = document.querySelectorAll('.forecastDays'); 
let pic = document.querySelectorAll('.forecastWeatherPic'); 
let temp = document.querySelectorAll('.forecastTemp'); 
let desc = document.querySelectorAll('.forecastWeatherDecs'); 

let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latAndLon.coord.lat}&lon=${latAndLon.coord.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}`)
let forecastJson = await response.json(); 

for (let i = 0; i < days.length; i++) {
    var s = new Date( (forecastJson.daily[i].dt)*1000).toLocaleDateString(); 
    days[i].innerHTML =s; 
}

for (let i = 0; i < pic.length; i++) {
    pic[i].src =  `http://openweathermap.org/img/wn/${forecastJson.daily[i].weather[0].icon}@2x.png`;
}
for (let i = 0; i < temp.length; i++) {
    let avgTemp = (forecastJson.daily[i].temp.day - 273.15).toFixed(2); 
    temp[i].innerHTML =  `Average temperature ${avgTemp}°C`;
}
for (let i = 0; i < temp.length; i++) {
  
    desc[i].innerHTML =  forecastJson.daily[i].weather[0].description;
}
}

const cityDisplayId = document.getElementById('city');
const tempId = document.getElementById('deg');
const cloudsId = document.getElementById('clouds');
const windSpeedId = document.getElementById('wind-speed')
const humidityId = document.getElementById('humidity')
const pressureId = document.getElementById('pressure')
const weatherContainer = document.getElementById('weather-container');
/* main fetch map api */
const loadWeather = () =>{
    const inputField = document.getElementById('weather-input-field');
    ipLocation().then(location =>{
    const defaultLocation = location;
    const searchInputText = inputField.value;
    inputField.value = '';
    // console.log(defaultLocation)
    if((inputField.value == inputField.value) || (defaultLocation == defaultLocation)){
        const locationCity = searchInputText || defaultLocation;
        cityDisplayId.innerText = locationCity;
        // reset input field
        const weather_api_url = `https://api.openweathermap.org/data/2.5/weather?q=${locationCity}&appid=fbbf1bb4696e23ecd0715c836a15dcba`;
        fetch(weather_api_url)
        .then(res => res.json())
        .then(data =>displayLocation(data))
    }
    
 })
}
/* all time load weathers */
const displayLocation = weather =>{
    // console.log(weather)
    const temp = Math.floor(weather.main.temp - 273.15);
    const icon = weather.weather[0].icon;
    const country = weather.sys.country;
    const clouds = weather.clouds.all;
    const wind = weather.wind.speed;
    const pressure = weather.main.pressure;
    const humidity = weather.main.humidity;
    // console.log(country)
    tempId.innerText = `${temp} °C`;
    cloudsId.innerText ='Clouds: ' + clouds;
    windSpeedId.innerText ='Wind '+ wind + 'km/h';
    humidityId.innerText = 'Humidity '+ humidity+'%';
    pressureId.innerText ='Air Pressure '+ pressure+'°';
    const span = document.createElement('span');
    span.innerText =`(${country})`;
    cityDisplayId.appendChild(span);
    weatherContainer.innerHTML = `<div class="weather-items">
    <img
    src="https://openweathermap.org/img/wn/${icon}@2x.png"
    alt=""
/>
<h4></h4>
    </div>`;
    
}
/* ip finder all location fetch */
const ipLocation =async () =>{
    const ip_api_url = `https://freegeoip.app/json/`;
    const res = await fetch(ip_api_url);
    const data =await res.json()
    const city =await data.city;
    return city;
}
/* ip finder location city */
loadWeather()
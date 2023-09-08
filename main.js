const apiKey = '546fca394b3fd073dde8fd3e63ba9ea1';

const searchInput = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const body = document.querySelector('body');
const container = document.querySelector('.container');

async function checkWeather (city = 'москва', lang = 'ru') {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&units=metric&appid=${apiKey}`;
  
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log(data);

  const weatherCont = document.querySelector('.weather');
  const error = document.querySelector('.error');
  const empty = document.querySelector('.empty');

  if (data.cod === '404') {
    weatherCont.style.display = 'none';
    error.style.display = 'block';
    empty.style.display = 'none';
  }

  if (data.cod === '400') {
    weatherCont.style.display = 'none';
    error.style.display = 'none';
    empty.style.display = 'block';
  }  

  const weatherImage = document.querySelector('.weather-image i');
  const weather = data.weather[data.weather.length - 1].main;


  switch (weather) {
    case "Clear":
      weatherImage.className = "fa-solid fa-sun";
      container.style.backgroundColor = '#FFCA41';
      body.style.backgroundImage = 'url(https://konstantin-bavin.github.io/weather/img/synnyFFCA41.png)';
      break;

    case "Rain":
      weatherImage.className = "fa-solid fa-cloud-rain";
      container.style.backgroundColor = '#6C7BA3';
      body.style.backgroundImage = 'url(https://konstantin-bavin.github.io/weather/img/rain6C7BA3.png)';
      break;

    case "Mist":
      weatherImage.className = "fa-solid fa-cloud-mist";
      container.style.backgroundColor = '#E9ECEC';
      body.style.backgroundImage = 'url(https://konstantin-bavin.github.io/weather/img/mistE9ECEC.png)';
      break;

    case "Drizzle":
      weatherImage.className = "fa-solid fa-cloud-drizzle";
      container.style.backgroundColor = '#7DD9BC';
      body.style.backgroundImage = 'url(https://konstantin-bavin.github.io/weather/img/drizzle7DD9BC.png)';
      break;

    case "Clouds":
      weatherImage.className = "fa-solid fa-cloud";
      container.style.backgroundColor = '#91b8ba';
      body.style.backgroundImage = 'url(https://konstantin-bavin.github.io/weather//img/cloud91b8ba.png)';
      break;

    default:
      break;
  }

  const description = data.weather[data.weather.length - 1].description;
  document.querySelector('.weather-description').innerHTML = description[0].toUpperCase() + description.slice(1);
  document.querySelector('.temp-now').innerHTML = Math.round(data.main.temp)+ '&#8451';
  document.querySelector('.feels-like').innerHTML = `Ощущается как ${data.main.feels_like}&#8451`;
  document.querySelector('.city').innerHTML = city;
  document.querySelector('.humidity-now').innerHTML = `${data.main.humidity}%`;
  document.querySelector('.wind-speed').innerHTML = `${data.wind.speed} м/с`;
  document.querySelector('.time-sunrise').innerHTML = getTime(data, 'sunrise');
  document.querySelector('.time-sunset').innerHTML = getTime(data, 'sunset');
  
  weatherCont.style.display = 'block';
  error.style.display = 'none';
  empty.style.display = 'none';
}

function getTime (data, sun) {
  let time;
  const timeZone = data.timezone / 60 / 60;
  
  if (sun === 'sunrise') {
    time = new Date(data.sys.sunrise * 1000)
  }
  if (sun === 'sunset') {
    time = new Date(data.sys.sunset * 1000)
  }

  let hours = time.getUTCHours() + timeZone;
  if (hours > 24) {
    hours = '0' + (hours - 24);
  } else if (hours < 0) {
    hours = 24 + hours;
  } else if (hours < 10) {
    hours = '0'+ hours;
  } 

  let minutes = time.getUTCMinutes()
  minutes = minutes < 10 ? '0'+ minutes : minutes;

  return `${hours}:${minutes}`;
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchInput.value);
  searchInput.value = '';
});
import sun from "../assets/sun.png";
import Clock from "./Clock";
import Sunrise from "../assets/sunrise.png";
import Sunset from "../assets/sunset.png";
import Sunny from "../assets/sun.png";
import Humidity from "../assets/humidity.png";
import Wind from "../assets/wind.png";
import Pressure from "../assets/pressure.png";
import UV from "../assets/uv.png";
import ForeCast from "./ForeCast";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const CityAndTime = ({ cityName, lat, lon, setLat, setLon }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [uvIndex, setUvIndex] = useState(null);

  const fetchData = async () => {
    try {
      const encodedCity = cityName ? encodeURIComponent(cityName): null;
      let url;

      if (encodedCity) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&units=metric&appid=225a899c0e296b85a416d3d1d9629db3
`;
      } else if (lat && lon) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=225a899c0e296b85a416d3d1d9629db3
`;
      } else {
        toast.error("Missing city name or coordinates");
        return;
      }

      const currentWeather = await axios.get(url);
      setWeatherData(currentWeather.data);

      const { coord } = currentWeather.data;
      setLat(coord.lat);
      setLon(coord.lon);

      const forecast = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=225a899c0e296b85a416d3d1d9629db3
`
      );
      setForecastData(forecast.data);

      const uv = await axios.get(
        `https://api.openweathermap.org/data/2.5/uvi?lat=${coord.lat}&lon=${coord.lon}&appid=225a899c0e296b85a416d3d1d9629db3
`
      );
      setForecastData(forecast.data);
      setUvIndex("N/A");
    } catch (error) {
      console.error("Error fetching weather: ", error);
      toast.error("Failed to fetch weather data");
    }
  };

  useEffect(() => {
    if (!cityName && (!lat || !lon)) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLat(latitude);
          setLon(longitude);
          fetchData(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast.error("Unable to fetch location. Please enter a city manually");
        }
      );
    } else {
      fetchData(lat, lon);
    }
    // eslint-disable-next-line
  }, [cityName, lat, lon]);

  if (!weatherData || !forecastData) {
    return (
      <div className="flex items-center justify-center text-white text-2xl md:text-6xl">
        Loading...
      </div>
    );
  }

  const { main, weather, sys, wind } = weatherData;
  const{ list } = forecastData

  const weatherIconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`

  return (
    <>
      <div className="flex flex-col xl:flex-row gap-4">
        {/* City & Clock */}
        <div className="w-full xl:w-1/3 h-auto md:h-72 bg-[#050e1fde] shadow-2xl shadow-black rounded-lg text-white p-4 flex flex-col justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">
            {cityName || weatherData.name}
          </h1>
          <img src={sun} alt="Weather" className="w-20 select-none" />
          <Clock />
        </div>

        {/* Weather Details */}
        <div className="flex-grow h-auto md:h-72 bg-[#050e1fde] shadow-2xl rounded-lg text-white p-4 flex flex-col justify-around md:flex-row items-center md:items-stretch gap-4">
          {/* Temperature and sunrise/sunset */}
          <div className="flex flex-col items-center justify-between xl:justify-center gap-6 md:gap-4">
            <h1 className="text-5xl md:text-7xl font-bold">
              {main.temp}&#8451;
            </h1>
            <p className="text-center">
              Feels like:
              <span className="text-lg md:text-xl ml-2 font-bold">
                {main.feels_like}&#8451;
              </span>
            </p>
            <div className="flex xl:flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <img src={Sunrise} alt="sunrise" className="h-8 md:h-10" />
                <div>
                  <h6>Sunrise</h6>
                  <p>{new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <img src={Sunset} alt="sunset" className="h-8 md:h-10" />
                <div>
                  <h6>Sunset</h6>
                  <p>{new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Icon and Description */}
          <div className="flex flex-col justify-center items-center">
            <img src={Sunny} alt="icon" className="w-36 h-36 md:w-52 md:h-52" />
            <p className="font-bold text-xl md:text-3xl capitalize">
              {weather[0].description}
            </p>
          </div>

          {/* Additional Info */}
          <div className="md:grid md:grid-cols-2 flex flex-row justify-between gap-4 md:p-4">
            <div className="flex flex-col items-center gap-2">
              <img src={Humidity} alt="humidity" className="h-8 md:h-10" />
              <p>{main.humidity}%</p>
              <h6>Humidity</h6>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img src={Wind} alt="wind" className="h-8 md:h-10" />
              <p>{wind.speed} km/h</p>
              <h6>Wind Speed</h6>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img src={Pressure} alt="pressure" className="h-8 md:h-10" />
              <p>{main.pressure} hPa</p>
              <h6>Pressure</h6>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img src={UV} alt="uv" className="h-8 md:h-10" />
              <p>{uvIndex !== null ? uvIndex : "N/A"}</p>
              <h6>UV Index</h6>
            </div>
          </div>
        </div>
      </div>

      {/* {data.forecast && data.forecast.list && (
        <ForeCast forecastData={data.forecast.list} />
      )} */}


      {/* Forecast component */}
      <ForeCast forecastData={list} />
    </>
  );
};

export default CityAndTime;

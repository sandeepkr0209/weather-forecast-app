// src/components/ForeCast.jsx

const ForeCast = ({ forecastData }) => {
  if (!forecastData || forecastData.length === 0) return null;

  const dailyForeCast = forecastData.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc.find(f => f.date === date)) {
      acc.push({
        temperature: `${item.main.temp}°C`,
        day: new Date(item.dt * 1000).toLocaleDateString("en-EN", { weekday: "short" }),
        date: date,
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
      });
    }
    return acc;
  }, []).slice(0, 5);

  const hourlyForeCast = forecastData.slice(0, 5).map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
    degree: `${item.main.temp}°C`,
    windspeed: `${item.wind.speed} km/h`
  }));

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="xl:w-96 w-full h-auto px-4 py-4 bg-[#050e1fde] shadow-2xl shadow-black m-4 mt-10 rounded-lg text-white">
        <h2 className="flex items-center justufy-center text-2xl font-bold text-amber-50">5 Days Forecast:</h2>
        {dailyForeCast.map((cast, index) => (
          <div
            key={index}
            className="flex flex-row justify-between items-center p-2"
          >
            <img src={cast.icon} alt="weather icon" className="w-10 h-10" />
            <p className="font-bold">{cast.temperature}</p>
            <p className="font-bold">{cast.day}, {cast.date}</p>
          </div>
        ))}
      </div>

      <div className="flex-grow h-auto px-4 py-4 bg-[#050e1fde] shadow-2xl m-4 mt-10 rounded-lg hidden lg:block text-amber-50">
        <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">Hourly Forecast</h1>
        <div className="flex justify-around items-center gap-4 flex-wrap">
          {hourlyForeCast.map((hourCast, index) => (
            <div key={index} className="flex flex-col items-center gap-3 bg-[#1c2938] rounded-lg p-4 w-28 text-center shadow-md">
              <p className="text-sm font-medium">{hourCast.time}</p>
              <img src={hourCast.icon} alt="icon" className="w-10 h-10" />
              <p>{hourCast.degree}</p>
              <p>{hourCast.windspeed}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForeCast;

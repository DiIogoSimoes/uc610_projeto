import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getWeatherData } from "../services/weatherService";
import { getWeatherDescription } from "../utils/weatherUtils";
import Loader from "../components/ui/Loader";
import DayChart from "../components/weather/DayChart";

const CITIES = [
  { name: "Lisboa", lat: 38.72, lon: -9.13 },
  { name: "Porto", lat: 41.15, lon: -8.61 },
  { name: "Faro", lat: 37.01, lon: -7.93 }
];

export default function Dashboard() {
  const [city, setCity] = useState(CITIES[0]);
  const [weather, setWeather] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getWeatherData(city.lat, city.lon).then(setWeather);
  }, [city]);

  if (!weather) return <Loader />;

  const todayChartData = weather.hourly.time.slice(0, 24).map((t, idx) => ({
    hour: t.slice(11, 16),
    temp: weather.hourly.temperature_2m[idx]
  }));

  return (
    <div className="fade-in">
      <header className="header-flex">
        <h1>Weather<span>Simoes</span></h1>
        <select className="city-select" onChange={(e) => setCity(CITIES.find(c => c.name === e.target.value))}>
          {CITIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
        </select>
      </header>

      <div className="current-card glass">
        <h2>{city.name} - Hoje</h2>
        <div className="big-temp">{Math.round(weather.current.temperature_2m)}°C</div>
        <p>{getWeatherDescription(weather.current.weather_code).label}</p>
        <div style={{height: '200px', marginTop: '20px'}}>
          <DayChart data={todayChartData} />
        </div>
      </div>

      <div className="forecast-grid">
        {weather.daily.time.map((date, i) => (
          <div key={date} className="day-card glass">
            <h4>{date.split('-').reverse().slice(0,2).join('/')}</h4>
            <div style={{fontSize: '2rem'}}>{getWeatherDescription(weather.daily.weather_code[i]).icon}</div>
            <p>⬆ {weather.daily.temperature_2m_max[i]}°</p>
            <button 
              className="btn-details" 
              onClick={() => navigate(`/day/${i}`, { state: { weather, city: city.name } })}
            >
              Mais Info
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
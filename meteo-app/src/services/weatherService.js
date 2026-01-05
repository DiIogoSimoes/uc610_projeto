export async function getWeatherData(lat, lon) {
  const params = [
    `latitude=${lat}`,
    `longitude=${lon}`,
    "current=temperature_2m,weather_code",
    "hourly=temperature_2m,relative_humidity_2m,uv_index,wind_speed_10m", 
    "daily=weather_code,temperature_2m_max,temperature_2m_min",
    "timezone=auto"
  ].join("&");

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!res.ok) throw new Error("Erro na API");
  return await res.json();
}
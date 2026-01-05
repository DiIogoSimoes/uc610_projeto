export function getWeatherDescription(code) {
  const codes = {
    0: { label: "Céu Limpo", icon: "☀️" },
    1: { label: "Principalmente Limpo", icon: "🌤️" },
    2: { label: "Parcialmente Nublado", icon: "⛅" },
    3: { label: "Nublado", icon: "☁️" },
    45: { label: "Nevoeiro", icon: "🌫️" },
    61: { label: "Chuva Leve", icon: "🌧️" },
    95: { label: "Trovoada", icon: "⚡" },
  };
  return codes[code] || { label: "Variável", icon: "🌦️" };
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' }).format(date);
}
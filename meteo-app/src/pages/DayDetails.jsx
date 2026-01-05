import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts";
import { formatDate, getWeatherDescription } from "../utils/weatherUtils";

export default function DayDetails() {
  const { state } = useLocation();
  const { dayIndex } = useParams();
  const navigate = useNavigate();

  if (!state || !state.weather) {
    return (
      <div className="container text-center mt-5">
        <button className="btn btn-outline-light" onClick={() => navigate("/")}>Voltar</button>
      </div>
    );
  }

  const i = Number(dayIndex);
  const start = i * 24;
  
  const maxTemp = state.weather.daily.temperature_2m_max[i];
  const minTemp = state.weather.daily.temperature_2m_min[i];
  const weatherStatus = getWeatherDescription(state.weather.daily.weather_code[i]);

  const hourlyData = state.weather.hourly.time.slice(start, start + 24).map((t, idx) => ({
    hour: t.slice(11, 16),
    temp: state.weather.hourly.temperature_2m[start + idx],
    humidity: state.weather.hourly.relative_humidity_2m[start + idx],
    wind: state.weather.hourly.wind_speed_10m ? state.weather.hourly.wind_speed_10m[start + idx] : 0,
    uv: state.weather.hourly.uv_index ? state.weather.hourly.uv_index[start + idx] : 0
  }));

  const avgWind = (hourlyData.reduce((acc, curr) => acc + curr.wind, 0) / 24).toFixed(1);

  return (
    <div className="container py-4 fade-in">
      <button className="btn-back mb-4" onClick={() => navigate("/")}>
        <span className="me-2">←</span> Voltar
      </button>

      <div className="glass p-4">
        <header className="mb-4">
          <h2 className="text-capitalize mb-1">{formatDate(state.weather.daily.time[i])}</h2>
          <p className="text-info">{state.city}</p>
        </header>

        {/* CARTÕES DE RESUMO AJUSTADOS (Máxima: 25º) */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-3">
            <div className="chart-box d-flex justify-content-between align-items-center px-4 py-3">
              <span className="text-muted">Máxima:</span>
              <strong className="fs-5">{maxTemp}º</strong>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="chart-box d-flex justify-content-between align-items-center px-4 py-3">
              <span className="text-muted">Mínima:</span>
              <strong className="fs-5">{minTemp}º</strong>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="chart-box d-flex justify-content-between align-items-center px-4 py-3">
              <span className="text-muted">Vento Médio:</span>
              <strong className="fs-5">{avgWind} km/h</strong>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="chart-box d-flex justify-content-between align-items-center px-4 py-3">
              <span className="text-muted">Céu:</span>
              <strong className="fs-5">{weatherStatus.label}</strong>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Gráfico de Temperatura - Área */}
          <div className="col-12 col-lg-6">
            <div className="chart-box p-3">
              <h6 className="mb-3 text-white-50">Temperatura (ºC)</h6>
              <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer>
                  <AreaChart data={hourlyData}>
                    <defs>
                      <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="hour" stroke="#94a3b8" fontSize={10} />
                    <YAxis stroke="#94a3b8" fontSize={10} />
                    <Tooltip contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '10px'}} />
                    <Area type="monotone" dataKey="temp" stroke="#38bdf8" fillOpacity={1} fill="url(#colorTemp)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* NOVO: Gráfico de Vento Linear */}
          <div className="col-12 col-lg-6">
            <div className="chart-box p-3">
              <h6 className="mb-3 text-white-50">Velocidade do Vento (km/h)</h6>
              <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer>
                  <LineChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="hour" stroke="#94a3b8" fontSize={10} />
                    <YAxis stroke="#94a3b8" fontSize={10} />
                    <Tooltip contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '10px'}} />
                    <Line type="monotone" dataKey="wind" stroke="#10b981" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Gráfico de Humidade - Estilo Prédio */}
          <div className="col-12 col-lg-6">
            <div className="chart-box p-3">
              <h6 className="mb-3 text-white-50">Humidade (%) - Estilo Prédio</h6>
              <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer>
                  <BarChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="hour" stroke="#94a3b8" fontSize={10} />
                    <YAxis stroke="#94a3b8" fontSize={10} />
                    <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#1e293b', border: 'none'}} />
                    <Bar dataKey="humidity" fill="#818cf8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Gráfico de UV - Estilo Prédio */}
          <div className="col-12 col-lg-6">
            <div className="chart-box p-3">
              <h6 className="mb-3 text-white-50">Índice UV Solar</h6>
              <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer>
                  <BarChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="hour" stroke="#94a3b8" fontSize={10} />
                    <YAxis stroke="#94a3b8" fontSize={10} />
                    <Tooltip contentStyle={{backgroundColor: '#1e293b', border: 'none'}} />
                    <Bar dataKey="uv" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function DayChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
        <XAxis dataKey="hour" stroke="#94a3b8" fontSize={10} />
        <YAxis hide />
        <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "none", fontSize: '12px' }} />
        <Line type="monotone" dataKey="temp" stroke="#38bdf8" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DayDetails from "./pages/DayDetails";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/day/:dayIndex" element={<DayDetails />} />
      </Routes>
    </div>
  );
}

export default App;
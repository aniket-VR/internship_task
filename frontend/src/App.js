import "./App.css";

import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import BarChartPage from "./Page/BarChartPage";
import StatisticsDataPage from "./Page/StatisticsDataPage";
import HomePage from "./Page/HomePage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/barchart" element={<BarChartPage />} />
        <Route path="/statistics" element={<StatisticsDataPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

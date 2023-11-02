import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import SigndPage from "./pages/SigndPage";
import MainPage from "./pages/MainPage";
import BillingPage from "./pages/BillingPage"
import ResultPage from "./pages/ResultPage"


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signd" element={<SigndPage />} />
          <Route index element={<MainPage />} />
          <Route path="/meeting/:meetingId" element={<BillingPage />} />
          <Route path="/api/share" element={<ResultPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

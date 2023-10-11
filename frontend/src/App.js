import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import SigndPage from "./pages/SigndPage";
import MainPage from "./pages/MainPage";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signd" element={<SigndPage />} />
          <Route index element={<MainPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

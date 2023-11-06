import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import SigndPage from "./pages/SigndPage";
import MainPage from "./pages/MainPage";
import BillingPage from "./pages/BillingPage"
import ResultPage from "./pages/ResultPage"
import KakaoRedirect from "./components/KakaoRedirect";
import NaverRedirect from "./components/NaverRedirect";
import GooglesRedirect from "./components/GoogleRedirect";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signd" element={<SigndPage />} />
          <Route path="/kakao-redirect" element={<KakaoRedirect />} />
          <Route path="/naver-redirect" element={<NaverRedirect  />} />
          <Route path="/google-redirect" element={<GooglesRedirect />} />
          <Route index element={<MainPage />} />
          <Route path="/meeting/:meetingId" element={<BillingPage />} />
          <Route path="/share" element={<ResultPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

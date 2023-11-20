import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SigndPage from "./pages/SigndPage";
import MainPage from "./pages/MainPage";
import BillingPage from "./pages/BillingPage";
import ResultPage from "./pages/ResultPage";

import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import {
  KakaoRedirect,
  GooglesRedirect,
  NaverRedirect,
} from "./components/SocialLogin/SocialPlatformRedirect";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signd" element={<SigndPage />} />
          <Route path="/kakao-redirect" element={<KakaoRedirect />} />
          <Route path="/naver-redirect" element={<NaverRedirect />} />
          <Route path="/google-redirect" element={<GooglesRedirect />} />
          <Route index element={<MainPage />} />
          <Route path="/meeting/:meetingId" element={<BillingPage />} />
          <Route path="/share" element={<ResultPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

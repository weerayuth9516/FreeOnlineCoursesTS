import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import HomePage from "../pages/HomePage";
import RegisterPage from "./RegisterPage";
import CoursePage from "./CoursePage";
import CourseDetailPage from "./CourseDetailPage";
import ScrollToTop from "../component/ScrollToTop";

function UnauthenticatedApp() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/coursedetail/:courseId" element={<CourseDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default UnauthenticatedApp;

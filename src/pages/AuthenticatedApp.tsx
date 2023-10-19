import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import UserProfilePage from "./UserProfilePage";
import CoursePage from "./CoursePage";
import CourseLearningPage from "./CourseLearningPage";
import CourseDetailPage from "./CourseDetailPage";
import MyCoursesPage from "./MyCoursesPage";
import ScrollToTop from "../component/ScrollToTop";
import FavoriteCoursesPage from "./FavoriteCoursesPage";

function AuthenticatedApp() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/coursedetail/:courseId" element={<CourseDetailPage />} />
        <Route
          path="/courselearning/:courseId"
          element={<CourseLearningPage />}
        />
        <Route path="/favorite" element={<FavoriteCoursesPage />} />
        <Route path="/mycourses" element={<MyCoursesPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;

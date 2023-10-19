import { useState, useEffect } from "react";
import supabase from "../supabase/client";
import NavBar from "../component/NavBar";
import { useAuth } from "../context/authentication";
import DisplayCourses from "../component/DisplayCourses";
import Footer from "../component/Footer";

function FavoriteCoursesPage() {
  const [userCourse, setUserCourse] = useState<any[]>([]);

  const auth = useAuth();

  const fetchFavoriteCourse = async (userId: string) => {
    try {
      const { data: existingCourse, error } = await supabase
        .from("user_favorite_courses")
        .select(`courses(*,video_lessons(*))`)
        .eq("user_id", userId)
        .order("created_at", { ascending: true });
      if (error) {
        console.error("Error:", error.message);
      } else {
        if (existingCourse.length > 0 && "courses" in existingCourse[0]) {
          const userCourses = existingCourse.map((item) => item.courses);
          return userCourses;
        } else {
          return [];
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      const fetchData = async () => {
        const userCourseData = await fetchFavoriteCourse(auth.userData.user.id);
        if (userCourseData !== undefined) {
          setUserCourse(userCourseData);
        }
      };
      fetchData();
      localStorage.setItem("previousPage", "favorite");
    }
  }, []);

  return (
    <>
      <div className="w-full flex flex-col justify-between items-center mb-10">
        <NavBar />
        <div className="text-[1.8rem] font-bold text-black mt-20 mb-5">
          Favorite Courses
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="w-[90%] flex flex-wrap justify-center grid-cols-3 gap-x-8 gap-y-8 mt-10">
            <DisplayCourses courses={userCourse} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FavoriteCoursesPage;

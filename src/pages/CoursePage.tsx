import { useState, useEffect } from "react";
import supabase from "../supabase/client";
import NavBar from "../component/NavBar";
import { useAuth } from "../context/authentication";
import DisplayCourses from "../component/DisplayCourses";
import Footer from "../component/Footer";
import SubFooter from "../component/SubFooter";

function CoursePage() {
  const [courses, setCourses] = useState<any[] | null>([]);
  const [inputText, setInputText] = useState("");

  const auth = useAuth();

  const fetchCourse = async () => {
    try {
      const { data } = await supabase
        .from("courses")
        .select(`*,video_lessons(*)`)
        .ilike("course_title", `%${inputText}%`)
        .order("created_at", { ascending: true });
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    localStorage.setItem("previousPage", "courses");
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCourse();
      setCourses(data);
    };
    fetchData();
  }, [inputText]);

  return (
    <>
      <div className="w-full flex flex-col justify-between items-center mb-10">
        <NavBar />
        <div className="text-[1.8rem] font-bold text-black mt-20 mb-5">
          Our Courses
        </div>
        <input
          type="text"
          className="w-[21rem] sm:w-[25rem] xl:w-[25rem] h-[3.2rem] text-black text-[1.2rem] border-2 border-gray-200 rounded-lg shadow-lg mt-10 mb-5 p-2 hover:border-orange-500"
          placeholder="Search..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="w-full flex justify-center items-center">
          <div className="w-[90%] flex flex-wrap justify-center grid-cols-3 gap-x-8 gap-y-8 mt-10">
            <DisplayCourses courses={courses} />
          </div>
        </div>
      </div>
      {!auth.isAuthenticated && <SubFooter />}
      <Footer />
    </>
  );
}

export default CoursePage;

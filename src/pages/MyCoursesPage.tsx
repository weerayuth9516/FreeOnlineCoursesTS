import { useState, useEffect } from "react";
import supabase from "../supabase/client";
import NavBar from "../component/NavBar";
import { useAuth } from "../context/authentication";
import DisplayCourses from "../component/DisplayCourses";
import Footer from "../component/Footer";
import defaultIcon from "../assets/navbar/default.png";

function MyCoursesPage() {
  const [firstName, setFirstName] = useState("");
  const [userId, setUserId] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  const [coverImageUrl, setCoverImageUrl] = useState(null);
  const [inprogressCount, setInprogressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [getFocus, setGetFocus] = useState(true);

  const auth = useAuth();

  const fetchAllUserCourse = async (userId: string, courseStatus: string) => {
    try {
      const { data } = await supabase
        .from("user_courses")
        .select("*,courses(*,video_lessons(*))")
        .eq("user_id", userId);
      const userCoursesWithStatus = data?.map((item) => {
        return {
          ...item,
          status: item.status,
        };
      });

      let filteredCourses = userCoursesWithStatus;

      const inprogressCount = userCoursesWithStatus?.filter(
        (item) => item.status === "in_progress"
      );

      inprogressCount ? setInprogressCount(inprogressCount.length) : null;
      const completedCount = userCoursesWithStatus?.filter(
        (item) => item.status === "completed"
      );
      completedCount ? setCompletedCount(completedCount.length) : null;

      if (courseStatus !== null && courseStatus !== "") {
        filteredCourses = userCoursesWithStatus?.filter(
          (item) => item.status === courseStatus
        );
      }
      if (filteredCourses !== undefined) {
        setCourses(filteredCourses.map((item) => item.courses));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserProfile = async (userId: string) => {
    if (userId) {
      try {
        const { data: profile, error } = await supabase
          .from("users")
          .select("*")
          .eq("user_id", userId)
          .single();
        if (error) {
          console.log("User have not updated profile before");
        }
        if (profile !== null) {
          setFirstName(profile.first_name);
          setCoverImageUrl(profile.cover_image);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (auth.isAuthenticated) {
        const getUserId = await auth.userData.user.id;
        setUserId(getUserId);
        getUserProfile(getUserId);
        fetchAllUserCourse(getUserId, "");
      }
    };
    fetchData();
    localStorage.setItem("previousPage", "mycourses");
  }, []);

  return (
    <>
      <div className="w-full flex flex-col justify-between items-center mb-10">
        <NavBar />
        <div className="text-[1.8rem] font-bold text-black mt-20">
          My Courses
        </div>
        <div className="flex flex-col sm:flex-row xl:flex-row text-[1.1rem] text-gray-500 mt-20">
          <button
            onClick={() => {
              fetchAllUserCourse(userId, "");
              setGetFocus(true);
            }}
            className={`sm:mr-10 xl:mr-10 text-black p-2 ${
              getFocus ? "border-b border-black " : "text-gray-500"
            } hover:border-b hover:border-b-1 hover:text-black focus:text-black focus:border-b focus:border-b-1 focus:border-black`}
          >
            All Courses
          </button>
          <button
            onClick={() => {
              fetchAllUserCourse(userId, "not_started");
              setGetFocus(false);
            }}
            className="sm:mr-10 xl:mr-10 cursor-pointer hover:border-b hover:border-b-1 hover:text-black text-gray-500 focus:text-black focus:border-b focus:border-b-1 focus: border-black p-2"
          >
            Not Started
          </button>
          <button
            onClick={() => {
              fetchAllUserCourse(userId, "in_progress");
              setGetFocus(false);
            }}
            className="sm:mr-10 xl:mr-10 cursor-pointer hover:border-b hover:border-b-1 hover:text-black text-gray-500 focus:text-black focus:border-b focus:border-b-1 focus: border-black p-2"
          >
            Inprogress
          </button>
          <button
            onClick={() => {
              fetchAllUserCourse(userId, "completed");
              setGetFocus(false);
            }}
            className="sm:mr-10 xl:mr-10 cursor-pointer hover:border-b hover:border-b-1 hover:text-black text-gray-500 focus:text-black focus:border-b focus:border-b-1 focus: border-black p-2"
          >
            Completed
          </button>
        </div>
        <div className="relative w-full flex flex-wrap justify-center">
          <div className="h-[30rem] border-1 border-gray-400 rounded-lg shadow-lg flex flex-col justify-center items-center mt-10 xl:mr-10 p-10 xl:sticky top-20">
            <img
              src={coverImageUrl !== null ? coverImageUrl : defaultIcon}
              className="w-[120px] h-[120px] rounded-full object-cover mb-5 mt-5"
            />
            <div className="font-bold text-[1.8rem] text-gray-500 mb-5">
              {firstName}
            </div>
            <div className="flex justify-center items-center gap-x-5">
              <div className="w-[9rem] sm:w-[10rem] xl:w-[10rem] h-[10rem] border-1 bg-gray-200 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out">
                <div className="text-[1.1rem] mt-5 ml-2 p-2">
                  <p>Courses</p>
                  <p>Inprogress</p>
                  <p className="mt-10 text-[1.5rem] font-bold">
                    {inprogressCount}
                  </p>
                </div>
              </div>
              <div className="w-[9rem] sm:w-[10rem] xl:w-[10rem] h-[10rem] border-1 bg-gray-200 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out">
                <div className="text-[1.1rem] mt-5 ml-2 p-2">
                  <p>Courses</p>
                  <p>Completed</p>
                  <p className="mt-10 text-[1.5rem] font-bold">
                    {completedCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {courses.length ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-8 mt-10">
              <DisplayCourses courses={courses} />
            </div>
          ) : (
            <div className="w-full sm:w-[44rem] xl:w-[44rem]"></div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyCoursesPage;

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import NavBar from "../component/NavBar";
import { useAuth } from "../context/authentication";
import notStarted from "../assets/status/notStarted.png";
import inProgress from "../assets/status/inProgress.png";
import completed from "../assets/status/completed.png";
import arrowBack from "../assets/courses/arrowBack.png";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import useLearningPage from "../hook/useLearningPage";

function CourseLearningPage() {
  const {
    selectedItem,
    setSelectedItem,
    courses,
    setCourses,
    setUserCourse,
    lessons,
    setLessons,
    powerLevel,
    lessonIdArray,
    setUserId,
    videoStatus,
    currentLesson,
    setCurrentLesson,
    goToNextLesson,
    goToPreviousLesson,
    calculatePowerLevel,
    fetchUserCourse,
    updateCourseStatus,
    handleTitleClick,
    onPlay,
    onEnd,
    fetchLessons,
    fetchCourse,
  } = useLearningPage();
  const params = useParams();
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (auth.isAuthenticated) {
        setUserId(auth.userData.user.id);
      }
      const courseData = await fetchCourse();
      setCourses(courseData);
      const userCourse = await fetchUserCourse(auth.userData.user.id);
      setUserCourse(userCourse);
      const data: any[] | null = await fetchLessons(auth.userData.user.id);
      setLessons(data);

      if (data !== null) {
        setCurrentLesson({
          videoTitle: data[0].video_lessons.video_title,
          videoId: data[0].video_lessons.video_id,
          videoLessonId: data[0].video_lessons.video_lesson_id,
        });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    calculatePowerLevel();
    updateCourseStatus();
  }, [videoStatus]);

  return (
    <>
      <NavBar />
      <div className="w-full flex flex-col justify-between">
        <div className="relative w-full flex flex-col-reverse sm:flex-row xl:flex-row flex-wrap justify-center items-center sm:items-start xl:items-start gap-x-10 mb-10">
          <div className="w-[90%] sm:w-[55%] xl:w-[30%] mt-[5rem] sm:mt-5 xl:mt-5">
            <Link to={`/coursedetail/${params.courseId}`}>
              <div className="text-[1.2rem] font-bold text-[#2f5fac]">
                <img src={arrowBack} className="inline" /> Back
              </div>
            </Link>
            <div className="w-full mt-10 border-1 border-gray-200 rounded-lg shadow-lg p-2">
              <div className="ml-2.5 mb-5">
                <div className="text-orange-500 p-2">Course</div>
                <div className="mb-1 font-bold text-[1.5rem] p-2 pb-1">
                  {courses.course_title}
                </div>
                <div className="mt-1 p-2 pt-1 ">
                  {courses.course_summary && courses.course_summary.length > 100
                    ? `${courses.course_summary.slice(0, 100)}...`
                    : courses.course_summary || "No summary available"}
                </div>
              </div>
              <div className="mb-8 w-full h-[39px] flex flex-col justify-start items-start pl-5 pr-5">
                <div className="text-body3 mb-2 text-gray-700">
                  {powerLevel}% Completed
                </div>
                <div className="w-full h-[10px] bg-gray-300 rounded-lg">
                  <div
                    className="h-full transition-width ease-in-out duration-500 bg-blue-500 power-level rounded-lg bg-gradient-to-r from-[#95beff] to-[#1855ea]"
                    style={{ width: `${powerLevel}%` }}
                  ></div>
                </div>
              </div>
              <div className="font-bold text-[1.5rem] mb-5 pl-5">
                {lessonIdArray.length} Lessons
              </div>
              <div className="w-full">
                <div className="w-full text-[1.1rem] cursor-pointer">
                  <ul>
                    {lessons?.map((item, index) => (
                      <li
                        key={index}
                        className={`text-[1.2rem] flex items-center mb-2 ${
                          selectedItem === index ? "bg-gray-100" : ""
                        }`}
                        onClick={() => {
                          handleTitleClick(
                            item.video_lessons.video_title,
                            item.video_lessons.video_id,
                            item.video_lessons.video_lesson_id
                          );
                          setSelectedItem(index);
                        }}
                      >
                        {videoStatus[index] === "not_started" ? (
                          <img className="inline pl-4 mr-2" src={notStarted} />
                        ) : videoStatus[index] === "in_progress" ? (
                          <img className="inline pl-4 mr-2" src={inProgress} />
                        ) : (
                          <img className="inline pl-4 mr-2" src={completed} />
                        )}{" "}
                        {item.video_lessons.video_title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[90%] sm:w-[40rem] xl:w-[40rem] flex flex-col mt-5 sm:sticky sm:top-[6rem] xl:sticky xl:top-[6rem]">
            <div className="w-full mt-5">
              <div className="text-[1.8rem] mb-2">
                <div>{currentLesson.videoTitle}</div>
              </div>
              <ReactPlayer
                url={`https://www.youtube.com/embed/${currentLesson.videoId}`}
                controls
                width="100%"
                onPlay={onPlay}
                onEnded={onEnd}
              />
            </div>
            <div className="flex sm:flex-row xl:flex-row justify-between mt-7">
              {selectedItem > 0 ? (
                <button
                  className="w-[8rem] mt-2 bg-[#2f5fac] text-white px-4 py-2 rounded-md"
                  onClick={goToPreviousLesson}
                >
                  Previous
                </button>
              ) : (
                <div></div>
              )}
              {lessons !== null && selectedItem !== lessons.length - 1 ? (
                <button
                  className="w-[8rem] mt-2 bg-[#2f5fac] text-white px-4 py-2 rounded-md"
                  onClick={goToNextLesson}
                >
                  Next
                </button>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default CourseLearningPage;

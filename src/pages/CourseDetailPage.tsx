import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../component/NavBar";
import ReactPlayer from "react-player";
import { useAuth } from "../context/authentication";
import arrowBack from "../assets/courses/arrowBack.png";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import SubFooter from "../component/SubFooter";
import { ConfirmationBox } from "../component/ConfirmationBox";
import { ConfirmationFavorite } from "../component/ConfirmationBox";
import { ConfirmationRemoveFavorite } from "../component/ConfirmationBox";
import courseLessonImg from "../assets/courses/courseLessons.png";
import DisplayCourses from "../component/DisplayCourses";
import { CreatingCourse } from "../component/LoadingBox";
import useCourseDetail from "../hook/useCourseDetail";

function CourseDetailPage() {
  const {
    previousPage,
    setPreviousPage,
    updateStatus,
    updateAddFaverite,
    updateRemoveFaverite,
    courses,
    setCourses,
    relatedCourses,
    lessons,
    setLessons,
    setUserId,
    userCourse,
    showConfirm,
    setShowConfirm,
    showConfirmFavorite,
    setShowConfirmFavorite,
    showRemoveFavorite,
    setShowRemoveFavorite,
    showLoading,
    setShowLoading,
    userFavorites,
    fetchUserCourse,
    fetchFavoriteCourse,
    fetchCourse,
    fetchRelatedCourse,
    handleSubmit,
    handleAddFavorite,
    handleRemoveFavorite,
    relatedPage,
    setRelatedPage,
    storeRelatedPage,
    setStoreRelatedPage,
  } = useCourseDetail();
  const params = useParams();
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const previousPage = localStorage.getItem("previousPage");
    setPreviousPage(previousPage ?? "");
    setStoreRelatedPage(`coursedetail/${params.courseId}`);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCourse();
      setCourses(data?.[0]);
      setLessons(data?.[0].video_lessons);
      if (auth.isAuthenticated) {
        fetchUserCourse(auth.userData.user.id);
        fetchFavoriteCourse(auth.userData.user.id);
        setUserId(auth.userData.user.id);
      }
    };
    fetchData();
    fetchRelatedCourse();
  }, [updateStatus, updateAddFaverite, updateRemoveFaverite, params.courseId]);
  return (
    <>
      <div className="relative w-full flex flex-col justify-between z-0">
        <NavBar />
        <div className="flex flex-wrap justify-center mt-10 mb-10">
          <div className="w-[45rem] sm:mr-10 xl:mr-10 border-1 border-gray-200 rounded-lg shadow-lg p-5">
            <Link
              to={relatedPage ? `/${storeRelatedPage}` : `/${previousPage}`}
              onClick={() => setRelatedPage(false)}
            >
              <div className="text-[1.2rem] font-bold text-[#2f5fac] mb-5">
                <img src={arrowBack} className="inline" /> Back
              </div>
            </Link>
            <ReactPlayer
              url={`https://www.youtube.com/embed/${courses.video_trailer}`}
              controls
              width="100%"
            />
            <div className="text-[1.5rem] font-bold mt-10">Course Detail</div>
            <div className="text-[1rem] p-5">{courses.course_detail}</div>
            <div className="text-[1.5rem] font-bold">
              {lessons.length} Lessons
            </div>
            <div className="p-5">
              <ol>
                {lessons.map((item: { [k: string]: any }, index) => {
                  return (
                    <div
                      key={index}
                      className="mb-2 flex items-center text-[1.2rem]"
                    >
                      <img src={courseLessonImg} className="inline mr-2" />
                      <li className="inline">{item.video_title}</li>
                    </div>
                  );
                })}
              </ol>
            </div>
          </div>
          <div className="w-[20rem] h-[27rem] ml-1 xl:ml-2.5 flex border-2 border-gray-200 rounded-lg shadow-lg mt-5 sticky top-[5rem]">
            <div className="ml-1 sm:ml-2.5 xl:ml-2.5 flex flex-col justify-evenly">
              <div className="text-orange-500 p-2">Course</div>
              <div className="mb-1 font-bold text-[1.5rem] p-2 pb-1">
                {courses.course_title}
              </div>
              <div className="mt-1 p-2 pt-1 ">
                {courses.course_summary && courses.course_summary.length > 100
                  ? `${courses.course_summary.slice(0, 100)}...`
                  : courses.course_summary || "No summary available"}
                <div className="w-[96%] flex flex-col justify-center items-center mt-5 gap-y-2 mr-2">
                  {!userFavorites.includes(courses.course_id) &&
                    auth.isAuthenticated &&
                    !userCourse.includes(courses.course_id) && (
                      <button
                        className="w-[15rem] h-[50px] bg-white rounded-lg text-orange-500 font-bold mt-2 border-2 border-orange-500"
                        onClick={() => {
                          setShowConfirmFavorite(true);
                        }}
                      >
                        Add to Favorites
                      </button>
                    )}
                  {userFavorites.includes(courses.course_id) &&
                    auth.isAuthenticated &&
                    !userCourse.includes(courses.course_id) && (
                      <button
                        className="w-[15rem] h-[50px] bg-white rounded-lg text-orange-500 font-bold mt-2 border-2 border-orange-500"
                        onClick={() => {
                          setShowRemoveFavorite(true);
                        }}
                      >
                        Remove from Favorites
                      </button>
                    )}
                  {!userCourse.includes(courses.course_id) &&
                    auth.isAuthenticated && (
                      <button
                        className="w-[15rem] h-[50px] bg-[#2f5fac] rounded-lg text-white font-bold mt-2"
                        onClick={() => {
                          setShowConfirm(true);
                        }}
                      >
                        Subscribe This Course
                      </button>
                    )}
                  {userCourse.includes(courses.course_id) &&
                    auth.isAuthenticated && (
                      <button
                        className="w-[15rem] h-[50px] bg-[#2f5fac] rounded-lg text-white font-bold mt-2"
                        onClick={() => {
                          navigate(`/courseLearning/${courses.course_id}`);
                        }}
                      >
                        Course Learning
                      </button>
                    )}
                  {!userCourse.includes(courses.course_id) &&
                    !auth.isAuthenticated && (
                      <button
                        className="w-[15rem] h-[50px] bg-[#2f5fac] rounded-lg text-white font-bold mt-2"
                        onClick={() => {
                          navigate("/login");
                        }}
                      >
                        Login to get started
                      </button>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-10">
          <h1 className="text-black-500 text-[1.8rem]">Other Related Course</h1>
          <div className="w-full flex flex-wrap justify-center grid-cols-3 gap-x-8 gap-y-8 mt-10 mb-10">
            <DisplayCourses
              courses={relatedCourses}
              sendDataBack={(data) => {
                setRelatedPage(data);
              }}
            />
          </div>
        </div>
        {!auth.isAuthenticated && <SubFooter />}
        <Footer />
        {showConfirm && (
          <ConfirmationBox
            courseName={courses.course_title}
            sendDataBack={(data) => {
              setShowConfirm(data);
              setShowLoading(data);
              if (data) {
                handleSubmit(courses.course_id);
                setShowConfirm(false);
              }
            }}
          />
        )}
        {showConfirmFavorite && (
          <ConfirmationFavorite
            courseName={courses.course_title}
            sendDataBack={(data) => {
              setShowConfirmFavorite(data);
              if (data) {
                handleAddFavorite(courses.course_id);
                setShowConfirmFavorite(false);
              }
            }}
          />
        )}
        {showRemoveFavorite && (
          <ConfirmationRemoveFavorite
            courseName={courses.course_title}
            sendDataBack={(data) => {
              setShowRemoveFavorite(data);
              if (data) {
                handleRemoveFavorite(courses.course_id);
                setShowRemoveFavorite(false);
              }
            }}
          />
        )}
        {showLoading && <CreatingCourse courseName={courses.course_title} />}
      </div>
    </>
  );
}

export default CourseDetailPage;

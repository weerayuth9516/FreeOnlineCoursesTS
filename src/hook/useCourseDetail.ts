import { useState } from "react";
import supabase from "../supabase/client";
import { useParams } from "react-router-dom";

function useCourseDetail() {
  const [relatedPage, setRelatedPage] = useState(false);
  const [storeRelatedPage, setStoreRelatedPage] = useState("");
  const [previousPage, setPreviousPage] = useState("");
  const [updateStatus, setUpdateStatus] = useState(false);
  const [updateAddFaverite, setUpdateAddFaverite] = useState(false);
  const [updateRemoveFaverite, setUpdateRemoveFaverite] = useState(false);
  const [courses, setCourses] = useState<{ [k: string]: any }>({});
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [userId, setUserId] = useState("");
  const [userCourse, setUserCourse] = useState<string[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showConfirmFavorite, setShowConfirmFavorite] = useState(false);
  const [showRemoveFavorite, setShowRemoveFavorite] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [userFavorites, setUserFavorites] = useState<string[]>([]);

  const params = useParams();

  const fetchUserCourse = async (userId: string) => {
    try {
      const { data: existingCourse, error } = await supabase
        .from("user_courses")
        .select("course_id")
        .eq("user_id", userId);
      if (error) {
        console.error("Error:", error.message);
      } else if (existingCourse) {
        const courseIdArray = existingCourse.map((course) => course.course_id);
        setUserCourse(courseIdArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFavoriteCourse = async (userId: string) => {
    try {
      const { data: existingCourse, error } = await supabase
        .from("user_favorite_courses")
        .select(`courses(course_id)`)
        .eq("user_id", userId)
        .order("created_at", { ascending: true });
      if (error) {
        console.error("Error:", error.message);
      } else {
        if (existingCourse.length > 0 && "courses" in existingCourse[0]) {
          const userCourses = existingCourse.map(
            (item: { [k: string]: any }) => item.courses.course_id
          );
          setUserFavorites(userCourses);
        } else {
          setUserFavorites(["NO"]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCourse = async () => {
    try {
      const { data } = await supabase
        .from("courses")
        .select(`*,video_lessons(*)`)
        .eq("course_id", params.courseId);
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const fetchRelatedCourse = async () => {
    interface Data {
      [key: string]: any;
    }
    try {
      const { data }: Data = await supabase
        .from("courses")
        .select(`*,video_lessons(*)`)
        .neq("course_id", params.courseId);
      const shuffledCourses = data.sort(() => Math.random() - 0.5);
      const randomCourses = shuffledCourses.slice(0, 3);
      setRelatedCourses(randomCourses);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (courseId: string) => {
    try {
      const { data: existingCourse } = await supabase
        .from("user_courses")
        .select("*")
        .eq("course_id", courseId)
        .eq("user_id", userId)
        .single();
      if (existingCourse === null) {
        const { error } = await supabase
          .from("user_courses")
          .upsert([
            { user_id: userId, course_id: courseId, status: "not_started" },
          ]);
        if (error) {
          console.error("Error:", error.message);
        }
      }
      if (existingCourse === null) {
        try {
          const { data: lessonData, error: lessonError } = await supabase
            .from("video_lessons")
            .select("video_lesson_id")
            .eq("course_id", courseId);

          if (lessonError) {
            console.error("Error fetching lessons:", lessonError.message);
          } else {
            const lessonIdArray = lessonData.map(
              (lesson) => lesson.video_lesson_id
            );
            for (const lessonId of lessonIdArray) {
              try {
                const { error: upsertError } = await supabase
                  .from("user_lesson_progress")
                  .upsert([
                    {
                      user_id: userId,
                      course_id: courseId,
                      video_lesson_id: lessonId,
                      status: "not_started",
                    },
                  ]);

                if (upsertError) {
                  console.error(
                    `Error upserting user lesson (lesson ID: ${lessonId}):`,
                    upsertError.message
                  );
                }
              } catch (error) {
                console.log(error);
              }
            }
            userFavorites.includes(courseId)
              ? handleRemoveFavorite(courseId)
              : null;
            setUpdateStatus(true);
            setShowLoading(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddFavorite = async (courseId: string) => {
    if (!userFavorites.includes(courseId)) {
      try {
        const { error: upsertError } = await supabase
          .from("user_favorite_courses")
          .upsert([
            {
              user_id: userId,
              course_id: courseId,
            },
          ]);

        if (upsertError) {
          console.error(upsertError.message);
        } else {
          setUpdateAddFaverite(true);
          setUpdateRemoveFaverite(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Course already added");
    }
  };

  const handleRemoveFavorite = async (courseId: string) => {
    if (userFavorites.includes(courseId)) {
      try {
        const { error: deleteError } = await supabase
          .from("user_favorite_courses")
          .delete()
          .eq("user_id", userId)
          .eq("course_id", courseId);

        if (deleteError) {
          console.error(deleteError.message);
        } else {
          setUpdateRemoveFaverite(true);
          setUpdateAddFaverite(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Course didn't exist");
    }
  };

  return {
    previousPage,
    setPreviousPage,
    updateStatus,
    setUpdateStatus,
    updateAddFaverite,
    setUpdateAddFaverite,
    updateRemoveFaverite,
    setUpdateRemoveFaverite,
    courses,
    setCourses,
    relatedCourses,
    setRelatedCourses,
    lessons,
    setLessons,
    userId,
    setUserId,
    userCourse,
    setUserCourse,
    showConfirm,
    setShowConfirm,
    showConfirmFavorite,
    setShowConfirmFavorite,
    showRemoveFavorite,
    setShowRemoveFavorite,
    showLoading,
    setShowLoading,
    userFavorites,
    setUserFavorites,
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
  };
}

export default useCourseDetail;

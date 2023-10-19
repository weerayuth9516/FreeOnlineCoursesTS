import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authentication";
import supabase from "../supabase/client";
import ArrowDrop from "../assets/navbar/ArrowDrop.png";
import profile from "../assets/navbar/profile.png";
import myCourses from "../assets/navbar/myCourses.png";
import logoutImg from "../assets/navbar/logout.png";
import defaultImage from "../assets/navbar/default.png";
import favoritesImage from "../assets/navbar/favorite.png";
interface NavBarProps {
  update?: number;
}
interface AuthData {
  logout: () => void;
  isAuthenticated: boolean;
  userData: UserData;
}
interface UserData {
  [key: string]: any;
}

function NavBar({ update }: NavBarProps) {
  const navigate = useNavigate();
  const { logout, isAuthenticated, userData }: AuthData = useAuth() as AuthData;
  const [coverImage, setCoverImage] = useState(null);
  const [displayName, setDisplayName] = useState("MyName");

  const auth: AuthData = useAuth() as AuthData;

  const getUserProfile = async (userId: string) => {
    if (userId) {
      try {
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("user_id", userId)
          .single();
        if (profile) {
          setCoverImage(profile.cover_image);
          setDisplayName(profile.display_name);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      if (userData.user.id) {
        getUserProfile(userData.user.id);
      }
    }
  }, [update]);
  return (
    <>
      <div className="w-full bg-white sticky z-10 top-0">
        <div className="w-full sm:h-[88px] xl:h-[88px] border-1 shadow-lg flex flex-col gap-y-5 sm:flex-row xl:flex-row justify-between">
          <div className="h-full flex justify-start sm:justify-center xl:justify-center items-center ml-2 mt-1 sm:mt-0 xl:mt-0 sm:ml-[2rem] xl:ml-[10rem]">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="w-[5.5rem] h-[3.5rem] rounded-lg bg-[#2f5fac] text-white font-bold mr-5"
            >
              HOME
            </button>
            <div
              onClick={() => {
                navigate("/courses");
              }}
              className="text-[1.2rem] text-gray-700 font-bold cursor-pointer"
            >
              Our Courses
            </div>
          </div>
          <div className="h-full flex justify-start sm:justify-center xl:justify-center items-center sm:mr-[2rem] xl:mr-[7rem]">
            {!isAuthenticated && (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="w-[5.5rem] h-[3.5rem] rounded-lg bg-[#2f5fac] text-white font-bold ml-2 mb-1 sm:mb-0 xl:mb-0"
                >
                  LogIn
                </button>
              </>
            )}
            {isAuthenticated && (
              <>
                {coverImage !== null && (
                  <div
                    onClick={() => {
                      navigate("/profile");
                    }}
                    className="w-[4.5rem] h-[4.5rem] cursor-pointer"
                  >
                    <img
                      src={coverImage}
                      className="inline object-cover w-full h-full rounded-full ml-2 pb-1"
                    />
                  </div>
                )}
                {coverImage === null && (
                  <div
                    onClick={() => {
                      navigate("/profile");
                    }}
                    className="w-[4.5rem] h-[4.5rem] cursor-pointer"
                  >
                    <img
                      src={defaultImage}
                      className="inline object-cover w-full h-full rounded-full ml-2 pb-1"
                    />
                  </div>
                )}
                <div className="relative inline group ml-7 z-10">
                  <button className="dropdown-button mb-2 cursor-pointer">
                    <div className="inline mr-2 font-bold text-[1.5rem] text-gray-500">
                      {displayName}
                    </div>
                    <img src={ArrowDrop} alt="Dropdown" className="inline" />
                  </button>

                  <div className="hidden text-[1.2rem] group-hover:block w-[11rem] bg-white absolute right-0 top-7 min-w-30 mt-2 rounded-lg shadow-md">
                    <div
                      onClick={() => {
                        navigate("/profile");
                      }}
                      className="block px-4 py-2 text-gray-500 hover:bg-gray-100 cursor-pointer"
                    >
                      <img src={profile} className="inline mr-2" />
                      Profile
                    </div>
                    <div
                      onClick={() => {
                        navigate("/mycourses");
                      }}
                      className="block px-4 py-2 text-gray-500 hover:bg-gray-100 cursor-pointer"
                    >
                      <img src={myCourses} className="inline mr-2" />
                      My Courses
                    </div>
                    <div
                      onClick={() => {
                        navigate("/favorite");
                      }}
                      className="block px-4 py-2 text-gray-500 hover:bg-gray-100 cursor-pointer"
                    >
                      <img src={favoritesImage} className="inline mr-2" />
                      Favorites
                    </div>
                    <div
                      onClick={logout}
                      className="block px-4 py-2 text-gray-500 hover:bg-gray-100 cursor-pointer"
                    >
                      <img src={logoutImg} className="inline mr-2" />
                      LogOut
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;

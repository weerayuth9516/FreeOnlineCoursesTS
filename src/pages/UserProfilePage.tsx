import { useEffect } from "react";
import NavBar from "../component/NavBar";
import { useAuth } from "../context/authentication";
import Footer from "../component/Footer";
import deleteIcon from "../assets/profile/deleteIcon.jpg";
import { ProfileLoading } from "../component/LoadingBox";
import useProfile from "../hook/useProfile";

function UserProfilePage() {
  const {
    imageError,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    displayName,
    setDisplayName,
    setUserId,
    email,
    setEmail,
    coverImage,
    updateStatus,
    setUpdateStatus,
    coverImageUrl,
    updateNavbar,
    displayNameError,
    setDisplayNameError,
    showLoading,
    handleFileChange,
    getUserProfile,
    handleSubmit,
    handleDeleteImage,
  } = useProfile();
  const auth: { [k: string]: any } = useAuth();

  useEffect(() => {
    if (auth.isAuthenticated) {
      setUserId(auth.userData.user.id);
      setEmail(auth.userData.user.email);
      getUserProfile(auth.userData.user.id);
    }
  }, []);

  return (
    <>
      <NavBar update={updateNavbar} />
      <div className="w-full flex justify-center items-center mt-10 mb-20">
        <div className="w-full flex flex-col xl:flex-row justify-center items-center mt-10 gap-x-20">
          <button
            type="button"
            onClick={() => document.getElementById("fileInput")?.click()}
            className="mb-[6rem]"
          >
            <div className="relative w-[250px] h-[250px] border-2 border-gray-500 rounded-lg mt-10">
              {coverImage || coverImageUrl ? (
                <img
                  src={deleteIcon}
                  onClick={handleDeleteImage}
                  className="absolute top-1 right-1 w-[2rem] cursor-pointer"
                />
              ) : null}
              {coverImage && coverImageUrl === null && (
                <img
                  src={typeof coverImage === "string" ? coverImage : undefined}
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
              {coverImageUrl && (
                <img
                  src={coverImageUrl}
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
              {coverImage === null && coverImageUrl === null && (
                <div className="w-full h-full flex flex-col justify-center items-center text-[1.3rem]">
                  <div>+</div> <div>Upload Avatar</div>
                </div>
              )}
            </div>
            {imageError ? (
              <div className="w-full ax-auto mt-3 text-[1rem] text-violet-500">
                Only jpeg, jpg, png & Max 5MB
              </div>
            ) : null}
          </button>
          <div className="w-[90%] xl:w-[30%] flex justify-center items-center">
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                handleSubmit(e)
              }
              className="w-[100%]"
            >
              <div className="w-full flex flex-col justify-center">
                <div className="w-full text-[24px] mb-2">
                  <label htmlFor="firstName" className="block mr-2">
                    First Name:
                  </label>
                  <input
                    className="w-full h-[3rem] border-2 border-gray-400 rounded-lg pl-2 hover:border-orange-400 focus:border-orange-400"
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setUpdateStatus(false);
                    }}
                    required
                  />
                </div>
                <div className="w-full text-[24px] mb-2">
                  <label htmlFor="lastName" className="block mr-2">
                    Last Name:
                  </label>
                  <input
                    className="w-full h-[3rem] border-2 border-gray-400 rounded-lg pl-2 hover:border-orange-400 focus:border-orange-400"
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setUpdateStatus(false);
                    }}
                    required
                  />
                </div>
                <div className="w-full text-[24px] mb-2">
                  <label htmlFor="lastName" className="block mr-2">
                    Display Name:
                  </label>
                  <input
                    className="w-full h-[3rem] border-2 border-gray-400 rounded-lg pl-2 hover:border-orange-400 focus:border-orange-400"
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={displayName}
                    onChange={(e) => {
                      setDisplayNameError(false);
                      const value = e.target.value;
                      const maxCharLimit = 15;
                      if (value.length <= maxCharLimit) {
                        setDisplayName(e.target.value);
                        setUpdateStatus(false);
                      } else {
                        setDisplayNameError(true);
                      }
                    }}
                    required
                  />
                </div>
                {displayNameError ? (
                  <div className="text-violet-500 text-[1rem]">
                    Display Name must be at most 15 characters long
                  </div>
                ) : null}
                <div className="w-full text-[24px]">
                  <label htmlFor="email" className="block mr-2">
                    Email:
                  </label>
                  <input
                    className="w-full h-[3rem] border-2 border-gray-400 rounded-lg pl-2 hover:border-orange-400 focus:border-orange-400"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setUpdateStatus(false);
                    }}
                    required
                    disabled={true}
                  />
                </div>

                <div className="w-full text-[24px] mt-2">
                  <input
                    type="file"
                    id="fileInput"
                    name="fileInput"
                    accept=".jpeg, .jpg, .png"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>

                <div className="w-full text-[1.3rem] mt-4">
                  <button
                    type="submit"
                    className="w-full h-[3rem] bg-[#2f5fac] rounded-lg text-white"
                    disabled={updateStatus}
                  >
                    Update Profile
                  </button>
                  {updateStatus && (
                    <div className="w-full ax-auto ml-3 mt-3 text-[1.3rem] text-violet-500">
                      Profile update was successful.
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      {showLoading ? <ProfileLoading /> : null}
    </>
  );
}

export default UserProfilePage;

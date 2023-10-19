import { useState } from "react";
import supabase from "../supabase/client";

function useProfile() {
  const [imageError, setImageError] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [coverImage, setCoverImage] = useState<string | ArrayBuffer | null>(
    null
  );
  const [updateStatus, setUpdateStatus] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [updateNavbar, setUpdateNavbar] = useState(0);
  const [displayNameError, setDisplayNameError] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const supabaseImageUrl = import.meta.env.VITE_IMAGE_URL;

  function generateUniqueImage(originalImage: string, userId: string) {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(7);
    const fileExtension = originalImage.split(".").pop();
    return `${userId}$_${randomId}_${timestamp}.${fileExtension}`;
  }

  const handleImageUpload = async () => {
    if (selectedFile && selectedFile !== null) {
      const uniqueFilename = generateUniqueImage(selectedFile.name, userId);
      try {
        const { data, error } = await supabase.storage
          .from("coverImage")
          .upload(`/images/${uniqueFilename}`, selectedFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          console.error("Error uploading file:", error.message);
          return null;
        } else {
          const imageUrl = `${supabaseImageUrl}/${data.path}`;
          setCoverImageUrl(imageUrl);
          setSelectedFile(null);
          return imageUrl;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    }
    return null;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateStatus(false);
    setImageError(false);
    const fileInput = e.target;
    if (fileInput && fileInput.files) {
      const file = fileInput.files[0];

      if (file) {
        const maxFileSizeBytes = 5 * 1024 * 1024; // 5 MB
        const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];

        if (
          file.size <= maxFileSizeBytes &&
          allowedFileTypes.includes(file.type)
        ) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const fileInput = e.target;
            if (fileInput && fileInput.result) {
              const file = fileInput.result;
              setCoverImage(file);
            }
            setCoverImageUrl(null);
            setSelectedFile(file);
          };
          reader.readAsDataURL(file);
        } else {
          setSelectedFile(null);
          setImageError(true);
        }
      }
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
          setLastName(profile.last_name);
          setDisplayName(profile.display_name);
          setCoverImageUrl(profile.cover_image);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowLoading(true);
    setUpdateStatus(false);
    try {
      const imageUrl = await handleImageUpload();
      const newProfileData = {
        user_id: userId,
        first_name: firstName,
        last_name: lastName,
        display_name: displayName,
        email: email,
        ...(selectedFile !== null
          ? {
              cover_image: imageUrl !== null ? imageUrl : coverImageUrl,
            }
          : { cover_image: null }),
      };
      const { error } = await supabase.from("users").upsert([newProfileData]);

      if (error) {
        console.error("Error:", error.message);
      } else {
        setShowLoading(false);
        setDisplayNameError(false);
        setUpdateStatus(true);
        setUpdateNavbar((previous) => previous + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteImage = () => {
    setCoverImage(null);
    setCoverImageUrl(null);
    setSelectedFile(null);
  };
  return {
    imageError,
    setImageError,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    displayName,
    setDisplayName,
    userId,
    setUserId,
    email,
    setEmail,
    coverImage,
    setCoverImage,
    updateStatus,
    setUpdateStatus,
    selectedFile,
    setSelectedFile,
    coverImageUrl,
    setCoverImageUrl,
    updateNavbar,
    setUpdateNavbar,
    displayNameError,
    setDisplayNameError,
    showLoading,
    setShowLoading,
    generateUniqueImage,
    handleImageUpload,
    handleFileChange,
    getUserProfile,
    handleSubmit,
    handleDeleteImage,
  };
}

export default useProfile;

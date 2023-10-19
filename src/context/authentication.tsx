import React from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase/client";

const AuthContext = React.createContext<any | undefined>(undefined);

function AuthProvider(props: any) {
  const navigate = useNavigate();
  const accessToken = import.meta.env.VITE_TOKEN;

  const login = async (values: { [key: string]: string }) => {
    try {
      let { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) {
        return { error: error.message };
      } else {
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (values: { [key: string]: string }) => {
    let userId;
    try {
      const { data } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
      userId = data.user?.id;
      if (userId) {
        try {
          const newProfileData = {
            user_id: userId,
            first_name: values.firstName,
            last_name: values.lastName,
            display_name: values.displayName,
            email: values.email,
          };
          const { error } = await supabase
            .from("users")
            .upsert([newProfileData]);

          if (error) {
            console.error("Error:", error.message);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem(accessToken);
      localStorage.removeItem("previousPage");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const isAuthenticated = Boolean(localStorage.getItem(accessToken));
  const userDataString = localStorage.getItem(accessToken);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  return (
    <AuthContext.Provider
      value={{ login, logout, register, isAuthenticated, userData }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };

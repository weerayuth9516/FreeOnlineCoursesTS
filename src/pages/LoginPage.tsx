import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/authentication";
import { useNavigate } from "react-router-dom";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";

const LoginPage = () => {
  const { login } = useAuth();
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: { [key: string]: string }) => {
    const result = await login(values);

    if (result.error) {
      setErrors(result.error);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col justify-between items-center">
        <NavBar />
        <div className="w-full sm:w-[50%] xl:w-[50%] text-[2rem] flex justify-center items-center mb-[10rem] mt-20">
          <div>
            <div className="text-[2rem] text-blue-700 mb-5">Welcome back!</div>
            <div className="w-full sm:w-[30rem] xl:w-[30rem]">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="w-full text-[1.2rem] mb-3">
                    <label htmlFor="email" className="block">
                      Email:
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      className="w-full h-[3rem] border-2 border-gray-400 rounded-lg pl-2 hover:border-orange-400 focus:border-orange-400"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-violet-500"
                    />
                  </div>

                  <div className="w-full text-[1.2rem]">
                    <label htmlFor="password" className="block">
                      Password:
                    </label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      className="w-full h-[3rem] border-2 border-gray-400 rounded-lg pl-2 hover:border-orange-400 focus:border-orange-400"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-violet-500"
                    />
                  </div>
                  {errors && (
                    <div className="text-[1.1rem] mt-2 mb-2 text-violet-500">
                      {errors}
                    </div>
                  )}
                  <div className="w-full mt-8">
                    <button
                      type="submit"
                      className="w-full h-[40px] text-[1rem] bg-[#2f5fac] rounded-lg text-white"
                    >
                      Login
                    </button>
                  </div>
                  <div className="w-full text-[1rem] mt-5">
                    <div className="inline mr-2">Don't have an account?</div>
                    <div
                      onClick={() => {
                        navigate("/register");
                      }}
                      className="inline w-full h-[40px] text-blue-500 font-bold cursor-pointer"
                    >
                      Register
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;

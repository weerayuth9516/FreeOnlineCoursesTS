import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import NavBar from "../component/NavBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authentication";
import Footer from "../component/Footer";
import ConfirmationEmailAlert from "../component/ConfirmationEmailAlert";
import { RegisterLoading } from "../component/LoadingBox";

const initialValues = {
  firstName: "",
  lastName: "",
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  displayName: Yup.string()
    .required("Display Name is required")
    .max(15, "Display Name must be at most 15 characters long"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .test("passwords-match", "Passwords must match", function (value) {
      const { password } = this.parent;
      return value === password || value === null;
    })
    .required("Confirm Password is required"),
});

const RegistrationPage = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (values: { [k: string]: any }) => {
    setShowLoading(true);
    const result = await register(values);
    if (result) {
      setShowLoading(false);
      setShowConfirm(true);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col justify-between items-center">
        <NavBar />
        <div className="w-[80%] sm:w-[50%] xl:w-[50%] text-[2rem] flex justify-center items-center mb-[5rem]">
          <div>
            <div className="text-[2rem] text-blue-700 mb-5 mt-10">
              Register to start learning!
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="w-full text-[1.2rem] mb-1">
                  <label htmlFor="firstName" className="mr-2">
                    First Name:
                  </label>
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full h-[3rem] border-2 border-gray-400 rounded-lg pl-2 hover:border-orange-400 focus:border-orange-400"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-violet-500 text-[1rem]"
                  />
                </div>
                <div className="w-full text-[1.2rem] mb-1">
                  <label htmlFor="lastName" className="mr-2">
                    Last Name:
                  </label>
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full h-[3rem] border-2 border-gray-400 rounded-lg pl-2 hover:border-orange-400 focus:border-orange-400"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-violet-500 text-[1rem]"
                  />
                </div>
                <div className="w-full text-[1.2rem] mb-1">
                  <label htmlFor="displayName" className="mr-2">
                    Display Name:
                  </label>
                  <Field
                    type="text"
                    id="displayName"
                    name="displayName"
                    className="w-full h-[3rem] border-2 border-gray-400 rounded-lg pl-2 hover:border-orange-400 focus:border-orange-400"
                  />
                  <ErrorMessage
                    name="displayName"
                    component="div"
                    className="text-violet-500 text-[1rem]"
                  />
                </div>
                <div className="w-full text-[1.2rem] mb-1">
                  <label htmlFor="email" className="mr-2">
                    Email:
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="w-full h-[3rem] border-2 border-gray-400 rounded-lg pl-2 hover:border-orange-400 focus:border-orange-400"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-violet-500 text-[1rem]"
                  />
                </div>
                <div className="w-full text-[1.2rem] mb-1">
                  <label htmlFor="password" className="mr-2">
                    Password:
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="w-full h-[3rem] border-2 border-gray-400 rounded-lg pl-2 hover:border-orange-400 focus:border-orange-400"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-violet-500 text-[1rem]"
                  />
                </div>
                <div className="w-full text-[1.2rem] mb-1">
                  <label htmlFor="confirmPassword" className="mr-2">
                    Confirm Password:
                  </label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full h-[3rem] border-2 border-gray-400 rounded-lg pl-2 hover:border-orange-400 focus:border-orange-400"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-violet-500 text-[1rem]"
                  />
                </div>
                <div className="w-full mb-8">
                  <button
                    type="submit"
                    className="w-full h-[40px] text-[1rem] bg-[#2f5fac] rounded-lg text-white"
                  >
                    Register
                  </button>
                </div>
                <div className="w-full text-[1rem] mt-5">
                  <div className="inline mr-2">Already have an account?</div>
                  <div
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="inline w-full h-[40px] text-blue-500 font-bold cursor-pointer"
                  >
                    Login
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      <Footer />
      {showLoading && <RegisterLoading />}
      {showConfirm && <ConfirmationEmailAlert />}
    </>
  );
};

export default RegistrationPage;

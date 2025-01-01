import React, { useEffect } from "react";
import Input from "../../../compents/Input/Input";
import Button from "../../../compents/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../Actions/authAction/userActions";
import { useFormik } from "formik";
import { loginvalidationSchema } from "../../../yupValidations/AuthValidationSchema";
import { useAlert } from "react-alert";
import { clearError, clearMessage } from "../../../Reducers/authReducers/userReducers";
const Login = () => {
  const { message,error}=useSelector((store) =>store.user);
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((store) => store.user);
  console.log("usremncnmncmv", user);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginvalidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        let res = await dispatch(loginUser(values));
        console.log("res", res);
        resetForm();
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  useEffect(() => {
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [message, error]);

  useEffect(() => {
    if (user && isAuthenticated) {
      navigate("/");
    }
  }, [user, isAuthenticated, navigate]);
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white shadow-lg p-8 rounded-lg max-w-md w-full">
        <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
          <h1 className="text-center text-5xl font-bold text-violet-950 mb-6">
            Log In
          </h1>

          <div>
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Email
            </label>
            <Input
              inputType="email"
              placeHolder="Enter Your Email..."
              id="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-400 font-bold">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Password
            </label>
            <Input
              inputType="password"
              placeHolder="Enter Your Password..."
              id="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-400 font-bold">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <Link to={"/"}>
            <span className="text-purple-700-900 font-bold text-sm">
              Guest Do not Need To Login click here
            </span>
          </Link>
          <Link to={"/register"}>
            <span className="text-green-900 font-bold">
              Don't Have An Account?
            </span>
          </Link>
          <div>
            <Button
              btnType="submit"
              btnText="Log In"
              btnTextColor="white"
              btnBgColor="red"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

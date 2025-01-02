import React, { useEffect } from "react";
import Input from "../../../compents/Input/Input";
import Button from "../../../compents/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { loginvalidationSchema } from "../../../yupValidations/AuthValidationSchema";
import { registerUser } from "../../../Actions/authAction/userActions";
import { useAlert } from "react-alert";
import { clearError, clearMessage } from "../../../Reducers/authReducers/userReducers";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const alert = useAlert();
  const { user, isAuthenticated, message, error } = useSelector(
    (store) => store.user
  );
  console.log("usremncnmncmv", user);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: loginvalidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        let res = await dispatch(
          registerUser({ ...values, role: "mainAdmin" })
        );
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
    <div className="w-[100%] p-2 h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white shadow-lg p-8 rounded-lg w-[400px]">
        <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
          <h1 className="text-center text-5xl font-bold text-violet-950 mb-6">
            Register
          </h1>

          <div>
            <label htmlFor="username" className="block text-gray-600 mb-2">
              User Name
            </label>
            <Input
              inputType="text"
              placeHolder="Enter Your User Name..."
              id="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-400 font-bold">
                {formik.errors.username}
              </div>
            ) : null}
          </div>

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

          <div>
            <label htmlFor="cpassword" className="block text-gray-600 mb-2">
              Confirm Password
            </label>
            <Input
              inputType="password"
              placeHolder="Enter Your Confirm Password..."
              id="cpassword"
              onChange={formik.handleChange}
              value={formik.values.confirmpassword}
            />
            {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
              <div className="text-red-400 font-bold">
                {formik.errors.confirmpassword}
              </div>
            ) : null}
          </div>
          <Link to={"/login"}>
            <span className="text-green-900 font-bold">
              Already Have An Account?
            </span>
          </Link>
          <div>
            <Button
              btnType="submit"
              btnText="Register"
              btnTextColor="white"
              btnBgColor="red"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

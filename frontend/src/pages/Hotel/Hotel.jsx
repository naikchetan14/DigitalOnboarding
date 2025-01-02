import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Input from "../../compents/Input/Input";
import Button from "../../compents/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { addNewHotel } from "../../Actions/hotelAction/hotelAction";
import { hotelValidationSchema } from "../../yupValidations/hotelValidationSchema";
import { useAlert } from "react-alert";
import {
  clearError,
  clearMessage,
} from "../../Reducers/hotelReducers/hotelReducers";
import { useNavigate } from "react-router-dom";

const Hotel = () => {
  const navigate = useNavigate();
  const { message, error } = useSelector((store) => store.hotels);
  const dispatch = useDispatch();
  const alert = useAlert();
  const [image, setImage] = useState(null);
  const formik = useFormik({
    initialValues: {
      hotelName: "",
      address: "",
    },
    validationSchema: hotelValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("runned gete");

      try {
        if (!image) {
          alert.error("Hotel image is required");
          return;
        }
        const payload = { ...values, logo: image };
        const res = await dispatch(addNewHotel(payload)).unwrap();
        if (res.type === "addNewHotel/fulfilled") {
          console.log("fuldfiled");
        } else if (res.type === "addNewHotel/rejected") {
          throw new Error("Invalid Details");
        }
        navigate("/");
        console.log("Success:", res);
        resetForm();
        console.log("rews", res);
      } catch (error) {
        console.log("error", error.message);
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };
  useEffect(() => {
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [message, error, alert, dispatch]);
  return (
    <div>
      <div className="w-full h-[90vh] p-4 flex justify-center items-center bg-gray-50">
        <div className="bg-white shadow-lg p-8 rounded-lg w-[400px]">
          <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
            <h1 className="text-center text-3xl font-bold text-violet-950 mb-6">
              Add New Hotel
            </h1>

            <div>
              <label htmlFor="hotelName" className="block text-gray-600 mb-2">
                Hotel Name
              </label>
              <Input
                inputType="text"
                placeHolder="Hotel Name..."
                id="hotelName"
                onChange={formik.handleChange}
                value={formik.values.hotelName}
              />
              {formik.touched.hotelName && formik.errors.hotelName ? (
                <div className="text-red-400 font-bold">
                  {formik.errors.hotelName}
                </div>
              ) : null}
            </div>

            <div>
              <label htmlFor="address" className="block text-gray-600 mb-2">
                Address
              </label>
              <Input
                inputType="text"
                placeHolder="Enter Your Address..."
                id="address"
                onChange={formik.handleChange}
                value={formik.values.address}
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="text-red-400 font-bold">
                  {formik.errors.address}
                </div>
              ) : null}
            </div>

            {/* <div>
              <label htmlFor="logo" className="block text-gray-600 mb-2">
                Logo
              </label>
              <Input
                inputType="text"
                placeHolder="Enter Your Hotel Logo URL..."
                id="logo"
                onChange={formik.handleChange}
                value={formik.values.logo}
              />
              {formik.touched.logo && formik.errors.logo ? (
                <div className="text-red-400 font-bold">
                  {formik.errors.logo}
                </div>
              ) : null}
            </div> */}

            {/* </div> */}
            <div>
              {image && (
                <div className="w-full">
                  <img
                    src={image}
                    alt="Hotel image"
                    className="w-[100px] mx-auto rounded-md"
                  />
                </div>
              )}
              <input
                type="file"
                id="image"
                name="image"
                className="p-4 border-2 border-grey-200 bg-purple-900 text-white shadow mt-2 block mx-auto w-full rounded-full"
                onChange={handleImageChange} // Calling the handleImageChange function
              ></input>
            </div>

            <div>
              <Button
                btnType="submit"
                btnText="Add Hotel"
                btnTextColor="white"
                btnBgColor="red"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hotel;

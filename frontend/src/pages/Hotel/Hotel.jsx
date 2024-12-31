import { useFormik } from "formik";
import React from "react";
import Input from "../../compents/Input/Input";
import Button from "../../compents/Button/Button";
import { useDispatch } from "react-redux";
import { addNewHotel } from "../../Actions/hotelAction/hotelAction";
import { hotelValidationSchema } from "../../yupValidations/hotelValidationSchema";

const Hotel = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      hotelName: "",
      address: "",
      logo: "",
    },
    validationSchema: hotelValidationSchema,
    onSubmit: async (values, { resetForm }) => {
        console.log('runned gete')
      try {
        const res = await dispatch(addNewHotel({ values }));
        console.log("rews", res);
        resetForm();
      } catch (error) {
        console.log("error", error.message);
      }
    },
  });
  return (
    <div>
      <div className="w-full p-4 flex justify-center items-center bg-gray-50">
        <div className="bg-white shadow-lg p-8 rounded-lg max-w-md w-full">
          <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
            <h1 className="text-center text-5xl font-bold text-violet-950 mb-6">
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

            <div>
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

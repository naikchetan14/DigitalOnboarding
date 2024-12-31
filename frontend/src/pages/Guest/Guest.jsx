import { useFormik } from "formik";
import React, { useEffect } from "react";
import Input from "../../compents/Input/Input";
import Button from "../../compents/Button/Button";
import { guestValidationSchema } from "../../yupValidations/guestValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { addGuestdetails } from "../../Actions/guestAction/guestActions";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { clearMessage } from "../../Reducers/guestReducers/guestReducers";

const Guest = () => {
  const alert = useAlert();
  const { id } = useParams();
  const { message, error } = useSelector((store) => store.guest);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      mobileNumber: "",
      address: "",
      purposeOfVisit: "",
      stayFrom: "",
      stayTo: "",
      email: "",
      idProofNumber: "",
    },
    validationSchema: guestValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await dispatch(addGuestdetails({ ...values, hotelId: id }));
        navigate("/guest/thanks");
        resetForm();
      } catch (error) {
        console.log("error", error.message);
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
  return (
    <div>
      <div className="w-full p-4 flex justify-center items-center bg-gray-50">
        <div className="bg-white shadow-lg p-8 rounded-lg max-w-md w-full">
          <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
            <h1 className="text-center text-5xl font-bold text-violet-950 mb-6">
              Guest Form
            </h1>

            <div>
              <label htmlFor="fullName" className="block text-gray-600 mb-2">
                Full Name
              </label>
              <Input
                inputType="text"
                placeHolder="Enter Your Full Name..."
                id="fullName"
                onChange={formik.handleChange}
                value={formik.values.fullName}
              />
              {formik.touched.fullName && formik.errors.fullName ? (
                <div className="text-red-400 font-bold">
                  {formik.errors.fullName}
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="mobileNumber"
                className="block text-gray-600 mb-2"
              >
                Mobile Number
              </label>
              <Input
                inputType="number"
                placeHolder="Enter Your Mobile Number..."
                id="mobileNumber"
                onChange={formik.handleChange}
                value={formik.values.mobileNumber}
              />
              {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                <div className="text-red-400 font-bold">
                  {formik.errors.mobileNumber}
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
              <label
                htmlFor="purposeOfVisit"
                className="block text-gray-600 mb-2"
              >
                Purpose Of Visit
              </label>
              <select
                id="purposeOfVisit"
                onChange={formik.handleChange}
                value={formik.values.purposeOfVisit}
                className="border-2 p-2 border-black rounded-md w-full"
              >
                <option value="Business">Business</option>
                <option value="Personal">Personal</option>
                <option value="Tourist">Tourist</option>
              </select>
              {formik.touched.purposeOfVisit && formik.errors.purposeOfVisit ? (
                <div className="text-red-400 font-bold">
                  {formik.errors.purposeOfVisit}
                </div>
              ) : null}
            </div>

            <div>
              <label htmlFor="stayFrom" className="block text-gray-600 mb-2">
                Stay From
              </label>
              <Input
                inputType="date"
                placeHolder="StyFrom..."
                id="stayFrom"
                onChange={formik.handleChange}
                value={formik.values.stayFrom}
              />
              {formik.touched.stayFrom && formik.errors.stayFrom ? (
                <div className="text-red-400 font-bold">
                  {formik.errors.stayFrom}
                </div>
              ) : null}
            </div>

            <div>
              <label htmlFor="stayTo" className="block text-gray-600 mb-2">
                Stay To
              </label>
              <Input
                inputType="date"
                placeHolder="stayTo..."
                id="stayTo"
                onChange={formik.handleChange}
                value={formik.values.stayTo}
              />
              {formik.touched.stayTo && formik.errors.stayTo ? (
                <div className="text-red-400 font-bold">
                  {formik.errors.stayTo}
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
              <label
                htmlFor="idProofNumber"
                className="block text-gray-600 mb-2"
              >
                ID Proof Number
              </label>
              <Input
                inputType="number"
                placeHolder="Enter Your ID Proof number..."
                id="idProofNumber"
                onChange={formik.handleChange}
                value={formik.values.idProofNumber}
              />
              {formik.touched.idProofNumber && formik.errors.idProofNumber ? (
                <div className="text-red-400 font-bold">
                  {formik.errors.idProofNumber}
                </div>
              ) : null}
            </div>

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
    </div>
  );
};

export default Guest;

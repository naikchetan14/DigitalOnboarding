import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { guestValidationSchema } from "../../yupValidations/guestValidationSchema";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {
  getAllGuestList,
  updateGuestDetails,
} from "../../Actions/guestAction/guestActions";

const EditModal = React.memo(({ setisOpened, currentGuestData }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      guestId: currentGuestData?._id,
      fullName: currentGuestData?.fullName || "",
      mobileNumber: currentGuestData?.mobileNumber || "",
      address: currentGuestData?.address || "",
      purposeOfVisit: currentGuestData?.purposeOfVisit || "",
      stayFrom: currentGuestData?.stayFrom || "",
      stayTo: currentGuestData?.stayTo || "",
      email: currentGuestData?.email || "",
      idProofNumber: currentGuestData?.idProofNumber || "",
    },
    validationSchema: guestValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await dispatch(updateGuestDetails({ ...values }));
        setisOpened(false);
        await dispatch(getAllGuestList());
        resetForm();
      } catch (error) {
        console.log("error", error.message);
      }
    },
  });
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="w-[50%] max-h-[90vh] bg-white shadow-md z-50 p-4 relative rounded-md overflow-y-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-300 scrollbar-thumb-rounded-md scrollbar-track-rounded-md hover:scrollbar-thumb-red-700">
        <div className="absolute right-10">
          {/* <ImCross onClick={() => setLikedToggle(false)}></ImCross> */}
          <button onClick={() => setisOpened(false)} className="px-4 p-2 rounded-md text-white bg-red-600">Close</button>
        </div>
        <div>
          <h1 className="font-bold text-3xl">Edit Guest Details</h1>
          <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
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
                btnText="Update"
                btnTextColor="white"
                btnBgColor="red"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

export default EditModal;

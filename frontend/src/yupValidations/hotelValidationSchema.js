import * as Yup from "yup";

export const hotelValidationSchema = Yup.object().shape({
  hotelName: Yup.string()
    .required("Full Name is required")
    .min(10, "Full Name must be at least 10 characters long"),
  address: Yup.string()
    .required("Address is required")
    .min(7, "Address must be at least 7 characters long") // Ensure at least 6 characters
    .max(20, "Maximum Address Length Should be 20"),
  logo: Yup.string().required("Hotel Logo is Required"),
});

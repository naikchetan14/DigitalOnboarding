import * as Yup from "yup";

export const loginvalidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long") // Ensure at least 6 characters
    .max(20, "Maximum Password Length Should be 20"),
});
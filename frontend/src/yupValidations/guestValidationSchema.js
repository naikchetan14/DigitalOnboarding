import * as Yup from "yup";

export const guestValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full Name is required")
    .min(3, "Full Name must be at least 3 characters long"),

  mobileNumber: Yup.string()
    .required("Mobile Number is required")
    .matches(/^[0-9]{10}$/, "Mobile Number must be a valid 10-digit number"),

  address: Yup.string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters long"),

  purposeOfVisit: Yup.string().required("Purpose of Visit is required"),

  stayFrom: Yup.date()
    .required("Stay From date is required")
    .typeError("Invalid date"),

  stayTo: Yup.date()
    .required("Stay To date is required")
    .min(
      Yup.ref("stayFrom"),
      "'Stay To' date cannot be earlier than 'Stay From'"
    ),

  email: Yup.string()
    .required("Email is required")
    .email("Email must be a valid email address"),

  idProofNumber: Yup.string()
    .required("ID Proof Number is required")
    .matches(
      /^[A-Za-z0-9]+$/,
      "ID Proof Number must contain only letters and numbers"
    ),
});

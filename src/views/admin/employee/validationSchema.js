import * as yup from "yup";

const validationsFormCreate = {
  name: yup.string().required("Required"),
  lastname: yup.string().required("Required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  pass: yup
    .string()
    .min(8, "Password must contain at least 8 characters")
    .required("Enter the password"),
  RoleId: yup.string().required("Select the role"),
    
};

const validationsFormUpdate = {
  name: yup.string().required("Required"),
  lastname: yup.string().required("Required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  RoleId: yup.string().required("Select the role"),
    
};

const validations = {
  validationsFormCreate,
  validationsFormUpdate
}

export default validations
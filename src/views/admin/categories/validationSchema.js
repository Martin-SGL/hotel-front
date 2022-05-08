import * as yup from "yup";

const validationsFormCreate = {
  name: yup.string().required("Required"),
  price: yup.number().required("Required"),
  max: yup.number().required("Required"),
  description: yup.string().required("Required"),
}

const validationsFormUpdate = {
  price: yup.number().required("Required"),
  max: yup.number().required("Required"),
  description: yup.string().required("Required"),
}

const validations = {
  validationsFormCreate,
  validationsFormUpdate
}

export default validations
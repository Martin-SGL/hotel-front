import * as yup from "yup";

const validationsForm = {
  name: yup.string().required("Required"),
  floor: yup.number().required("Required"),
  CategoryId: yup.number().required("Required"),
}

export default validationsForm
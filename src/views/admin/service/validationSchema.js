import * as yup from "yup"

const validationsForm = {
  name: yup.string().required("Required"),
  price: yup.number().required("Required"),
  description: yup.string().required("Required").max(250,"Description must contain less than 251 characters"),
}

export default validationsForm
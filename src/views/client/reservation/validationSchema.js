import * as yup from "yup"

let numbersReg = /[0-9]/

const validationsForm = {
  init_date: yup.string().required("Required"),
  final_date: yup.string().required("Required"),
  simple: yup.number().min(0).max(20).required("Required"),
  junior: yup.number().min(0).max(5).required("Required"),
  suite: yup.number().min(0).max(2).required("Required"),
  number_guests: yup.number().required("Required"),
  name: yup.string().required("Required"),
  lastname: yup.string().required("Required"),
  email: yup.string().required("Required").email("Enter a valid email"),
  phone: yup.string().matches(numbersReg,'digit has to be numbers').max(10).min(10).required("Required"),
  card_number: yup.string().matches(numbersReg,'digit has to be numbers').max(16).min(16).required("Required"),
  ccv: yup.string().matches(numbersReg,'digit has to be numbers').max(3).min(3).required("Required"),
  exp_date: yup.string().required("Required"),
}

export default validationsForm
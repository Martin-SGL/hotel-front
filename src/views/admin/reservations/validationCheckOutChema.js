import * as yup from "yup"

let numbersReg = /[0-9]/

const validationsForm = {
  card_number: yup.string().matches(numbersReg,'digit has to be numbers').max(16).min(16).required("Required"),
  ccv: yup.string().matches(numbersReg,'digit has to be numbers').max(3).min(3).required("Required"),
  exp_date: yup.string().required("Required"),
}

export default validationsForm
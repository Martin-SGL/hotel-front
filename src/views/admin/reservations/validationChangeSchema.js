import * as yup from "yup"

const validationsForm = {
    room: yup.string().required("Required"),
    reason: yup.string().required("Required").max(250,"Description must contain less than 251 characters"),
}

export default validationsForm
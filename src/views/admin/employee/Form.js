import React from "react";
import { withStyles, Card, CardContent, CardActions, TextField, MenuItem, Button} from "@material-ui/core";
import validationsForm from "./validationSchema";
import { withFormik } from "formik";
import * as yup from "yup";

const styles = () => ({
  card: {
    maxWidth: 420,
    marginTop: 50
  },
  container: {
    display: "Flex",
    justifyContent: "center"
  },
  actions: {
    float: "right"
  }
});

const form = props => {
  const {
    classes,
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    roles,
    handleForm,
    saveData,
  } = props;

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
            <TextField
              id="name"
              name = 'name'
              label="First Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.name ? errors.name : ""}
              error={touched.name && Boolean(errors.name)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="lastname"
              name = 'lastname'
              label="Last Name"
              value={values.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.lastname ? errors.lastname : ""}
              error={touched.lastname && Boolean(errors.lastname)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.email ? errors.email : ""}
              error={touched.email && Boolean(errors.email)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.password ? errors.password : ""}
              error={touched.password && Boolean(errors.password)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.confirmPassword ? errors.confirmPassword : ""}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              select
              id="RoleId"
              label="Role"
              value={values.course}
              onChange={handleChange("RoleId")}
              helperText={touched.RoleId ? errors.RoleId : ""}
              error={touched.RoleId && Boolean(errors.RoleId)}
              margin="dense"
              variant="outlined"
              fullWidth
            >
              {roles.map((option,index) => (
                <MenuItem key={index} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          <CardActions className={classes.actions}>
            <Button type="submit" color="primary" disabled={isSubmitting}>
              SUBMIT
            </Button>
            <Button color="secondary" onClick={handleReset}>
              CLEAR
            </Button>
          </CardActions>
      </form>
    </div>
  );
};

const Form = withFormik({
  mapPropsToValues: ({
    name,
    lastname,
    email,
    password,
    confirmPassword,
    RoleId
  }) => {

    return {
      name: name || "",
      lastname: lastname || "",
      email: email || "",
      password: password || "",
      confirmPassword: confirmPassword || "",
      RoleId: RoleId || ""
    };
  },

  validationSchema: yup.object().shape(validationsForm),

  handleSubmit: (values, { setSubmitting }) => {
    console.log(values)
  }
})(form);

export default withStyles(styles)(Form);
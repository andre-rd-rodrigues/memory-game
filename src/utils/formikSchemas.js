import * as yup from "yup";

const dataFields = {
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password is too short - should be 6 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain letters.")
};

const formikSettings = {
  schemas: {
    loginSchema: yup.object().shape(dataFields),
    registerSchema: yup.object().shape({
      ...dataFields,
      passwordConfirmation: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
      name: yup
        .string()
        .min(4, "Must be upper than 4 characters")
        .max(100, "Must be lesser than 100 characters")
        .required("Name is required")
    })
  },

  initialValues: {
    login: {
      email: "",
      password: ""
    },
    register: {
      email: "",
      password: "",
      name: ""
    }
  }
};

export default formikSettings;

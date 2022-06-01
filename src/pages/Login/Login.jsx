import React from "react";
import { postLogin } from "api/auth";
import Button from "components/Button/Button";
import ErrorMessage from "components/Form/ErrorMessage";
import InputField from "components/Form/InputField";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateLoading } from "store/ui/loading";
import {
  containerVariant,
  horizontal,
  motion
} from "styles/motions/motionVariants";
import { formikSettings } from "utils/formikSchemas";
import styles from "./login.module.scss";

const Login = ({ updateLoading }) => {
  const { initialValues, schemas } = formikSettings;
  const history = useHistory();

  const handleLogin = async (values) => {
    updateLoading(true);

    await postLogin(values)
      .then(() => {
        history.replace("/settings", "");
        setTimeout(() => updateLoading(false), 2000);
      })
      .catch(() => {
        updateLoading(false);
      });
  };
  return (
    <div className={styles.login}>
      <motion.div
        className={styles.login}
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.h1 variants={horizontal}>login</motion.h1>
        <motion.div variants={horizontal} className={styles.box}>
          <Formik
            initialValues={initialValues.login}
            validationSchema={schemas.loginSchema}
            onSubmit={(values) => handleLogin(values)}
          >
            {({ errors, touched, setFieldValue, handleSubmit }) => (
              <>
                <Form onSubmit={handleSubmit}>
                  <InputField
                    type="email"
                    name="email"
                    placeholder="example@mail.com"
                    label="Email:"
                    handleChange={(e) => setFieldValue("email", e.target.value)}
                  />
                  <ErrorMessage
                    message={errors.email}
                    touched={touched.email}
                  />
                  <InputField
                    type="password"
                    name="password"
                    placeholder="password"
                    label="Password:"
                    handleChange={(e) =>
                      setFieldValue("password", e.target.value)
                    }
                  />
                  <ErrorMessage
                    message={errors.password}
                    touched={touched.password}
                  />
                  <Button
                    type="submit"
                    label="LOGIN"
                    color="orange"
                    fullWidth
                  />
                </Form>
              </>
            )}
          </Formik>
        </motion.div>
      </motion.div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoading: (obj) => dispatch(updateLoading(obj))
  };
};

export default connect(null, mapDispatchToProps)(Login);

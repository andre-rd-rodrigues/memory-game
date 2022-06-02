import React from "react";
import { postLogin } from "api/auth";
import { Button, ErrorMessage, InputField } from "components";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { updateLoading } from "store/ui/loading";
import {
  containerVariant,
  horizontal,
  motion
} from "styles/motions/motionVariants";
import { formikSettings } from "utils";
import styles from "../auth.module.scss";

const Login = ({ updateLoading }) => {
  const { initialValues, schemas } = formikSettings;
  const history = useHistory();

  const handleLogin = async (values) => {
    updateLoading(true);

    await postLogin(values)
      .then(() => {
        history.replace("/settings", "");
        setTimeout(() => updateLoading(false), 1000);
      })
      .catch(() => {
        updateLoading(false);
      });
  };

  return (
    <motion.div
      className={styles.auth}
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h1 variants={horizontal}>Login</motion.h1>
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
                  label="Email"
                  handleChange={(e) => setFieldValue("email", e.target.value)}
                />
                <ErrorMessage message={errors.email} touched={touched.email} />
                <InputField
                  type="password"
                  name="password"
                  placeholder="password"
                  label="Password"
                  handleChange={(e) =>
                    setFieldValue("password", e.target.value)
                  }
                />
                <ErrorMessage
                  message={errors.password}
                  touched={touched.password}
                />
                <Button
                  icon="lock"
                  type="submit"
                  label="LOGIN"
                  color="orange"
                  fullWidth
                />
              </Form>
            </>
          )}
        </Formik>
        <Link to="/register" className="auth_redirect">
          Register here
        </Link>
      </motion.div>
    </motion.div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoading: (obj) => dispatch(updateLoading(obj))
  };
};

export default connect(null, mapDispatchToProps)(Login);

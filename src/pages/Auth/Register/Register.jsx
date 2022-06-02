import React from "react";
import { postRegister } from "api/auth";
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

const Register = ({ updateLoading }) => {
  const { initialValues, schemas } = formikSettings;
  const history = useHistory();

  const handleRegister = async (values) => {
    updateLoading(true);

    await postRegister(values)
      .then(() => {
        history.replace("/login", "");
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
      <motion.h1 variants={horizontal}>Register</motion.h1>
      <motion.div variants={horizontal} className={styles.box}>
        <Formik
          initialValues={initialValues.register}
          validationSchema={schemas.registerSchema}
          onSubmit={(values) => handleRegister(values)}
        >
          {({ errors, touched, setFieldValue, handleSubmit }) => (
            <>
              <Form onSubmit={handleSubmit}>
                <InputField
                  type="name"
                  name="name"
                  placeholder="John Doe"
                  label="Name"
                  handleChange={(e) => setFieldValue("name", e.target.value)}
                />
                <ErrorMessage message={errors.name} touched={touched.name} />
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
                <InputField
                  type="password"
                  name="passwordConfirmation"
                  placeholder="password"
                  label="Confirm password"
                  handleChange={(e) =>
                    setFieldValue("passwordConfirmation", e.target.value)
                  }
                />
                <ErrorMessage
                  message={errors.passwordConfirmation}
                  touched={touched.passwordConfirmation}
                />
                <Button
                  type="submit"
                  label="CREATE ACCOUNT"
                  color="orange"
                  fullWidth
                  icon="lock"
                />
              </Form>
            </>
          )}
        </Formik>
        <Link to="/login" className="auth_redirect">
          Sign in here
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

export default connect(null, mapDispatchToProps)(Register);

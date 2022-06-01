import React from "react";
import { Field } from "formik";
import styles from "./form.module.scss";

function InputField(props) {
  const { id, label } = props;
  return (
    <div className={styles.input}>
      <label htmlFor={id}>{label}</label>
      <Field {...props} />
    </div>
  );
}

export default InputField;

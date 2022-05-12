import React, { useState } from "react";
import styles from "./formgroup.module.scss";
import colors from "styles/_mixins.scss";

const FormGroup = ({ label, inputs = [""] }) => {
  const [selected, setSelected] = useState(inputs[0]);

  const renderStyle = (button) => {
    return {
      backgroundColor: selected === button ? colors.primary : ""
    };
  };

  return (
    <div className={styles.formGroup}>
      <p className="form-label">{label}</p>
      <div className="form-select">
        {inputs.map((button) => (
          <button
            onClick={() => setSelected(button)}
            style={renderStyle(button)}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormGroup;

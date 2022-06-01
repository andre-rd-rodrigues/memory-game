import React from "react";
import colors from "styles/_mixins.scss";
import styles from "./button.module.scss";

const Button = ({ color, label, onClick, fullWidth, type = "button" }) => {
  return (
    <button
      style={{ backgroundColor: colors[color], width: fullWidth && "100%" }}
      className={styles.button}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;

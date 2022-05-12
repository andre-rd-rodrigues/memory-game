import React from "react";
import styles from "./button.module.scss";
import colors from "styles/_mixins.scss";

const Button = ({ color, label, onClick }) => {
  return (
    <button
      style={{ backgroundColor: colors[color] }}
      className={styles.button}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;

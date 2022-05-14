import React from "react";
import colors from "styles/_mixins.scss";
import styles from "./button.module.scss";

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

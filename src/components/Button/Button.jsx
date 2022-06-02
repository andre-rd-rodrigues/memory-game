import React from "react";
import FeatherIcon from "feather-icons-react";
import colors from "styles/_mixins.scss";
import styles from "./button.module.scss";

const Button = ({
  color,
  label,
  onClick,
  fullWidth,
  type = "button",
  icon
}) => {
  return (
    <>
      <button
        style={{ backgroundColor: colors[color], width: fullWidth && "100%" }}
        className={styles.button}
        onClick={onClick}
        type={type}
      >
        {icon && <FeatherIcon icon={icon} size={18} />}
        {label}
      </button>
    </>
  );
};

export default Button;

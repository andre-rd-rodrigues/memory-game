import React from "react";
import styles from "./listrow.module.scss";

const ListRow = ({ label, content }) => {
  return (
    <div className={styles.listRow}>
      <p>{label}</p>
      <p>{content}</p>
    </div>
  );
};

export default ListRow;

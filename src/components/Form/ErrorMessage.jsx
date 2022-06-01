import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./form.module.scss";
/* import { dropDownVariants, exitErrorMessages } from "motion/motionVariants"; */

function ErrorMessage({ message, touched }) {
  return message && touched ? (
    <motion.div /* variants={dropDownVariants} */ className={styles.error}>
      <p>{message}</p>
    </motion.div>
  ) : null;
}

export default ErrorMessage;

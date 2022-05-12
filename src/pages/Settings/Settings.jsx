import FormGroup from "components/FormGroup/FormGroup";
import React from "react";
import { Link } from "react-router-dom";
import { generateNumbersArray } from "utils/globalUtils";
import styles from "./settings.module.scss";

const Settings = () => {
  return (
    <div className={styles.settings}>
      <h1>memory</h1>
      <div className={styles.box}>
        <FormGroup label="Select Theme" inputs={["Numbers", "Icons"]} />
        <FormGroup label="Number of Players" inputs={generateNumbersArray(4)} />
        <FormGroup label="Grid Size" inputs={["4x4", "6x6"]} />
        <Link to="/game">
          <button id="start-game-button">Start Game</button>
        </Link>
      </div>
    </div>
  );
};

export default Settings;

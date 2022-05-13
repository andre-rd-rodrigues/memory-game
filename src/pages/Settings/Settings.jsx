import FormGroup from "components/FormGroup/FormGroup";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  updateGameTime,
  updatePlayers,
  updateSettings
} from "store/entities/game";
import { generateNumbersArray } from "utils/globalUtils";
import styles from "./settings.module.scss";

const Settings = ({
  updatePlayers,
  updateSettings,
  updateGameTime,
  storeSettings
}) => {
  const handleChange = (state) => {
    if (typeof state === "number")
      return updatePlayers({ numberOfPlayers: state });
    switch (state) {
      case "4x4":
        return updateSettings({ ...storeSettings, boardSize: 4 });

      case "6x6":
        return updateSettings({ ...storeSettings, boardSize: 6 });

      default:
        return updateSettings({ ...storeSettings, theme: state.toLowerCase() });
    }
  };
  const handleStart = () =>
    updateGameTime({ type: "started", value: Date.now() });

  return (
    <div className={styles.settings}>
      <h1>memory</h1>
      <div className={styles.box}>
        <FormGroup
          label="Select Theme"
          inputs={["Icons", "Numbers"]}
          onChange={handleChange}
        />
        <FormGroup
          label="Number of Players"
          inputs={generateNumbersArray(4)}
          onChange={handleChange}
        />
        <FormGroup
          label="Grid Size"
          inputs={["4x4", "6x6"]}
          onChange={handleChange}
        />
        <Link to="/game">
          <button id="start-game-button" onClick={handleStart}>
            Start Game
          </button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { storeSettings: state.entities.game.settings };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSettings: (obj) => dispatch(updateSettings(obj)),
    updatePlayers: (obj) => dispatch(updatePlayers(obj)),
    updateGameTime: (obj) => dispatch(updateGameTime(obj))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

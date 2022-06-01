import React from "react";
import { connect } from "react-redux";
import SyncLoader from "react-spinners/SyncLoader";
import colors from "styles/_mixins.scss";
import styles from "./loading.module.scss";

const Loading = ({
  color = colors["light-green"],
  storeLoading,

  size = 20
}) => {
  return (
    storeLoading && (
      <div className={styles.loader} data-testid="loader">
        <SyncLoader color={color} loading={storeLoading} size={size} />
      </div>
    )
  );
};

const mapStateToProps = (state) => {
  return {
    storeLoading: state.ui.loading.state
  };
};

export default connect(mapStateToProps)(Loading);

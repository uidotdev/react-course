import * as React from "react";
import PropTypes from "prop-types";
import Hover from "./Hover";

const styles = {
  container: {
    position: "relative",
    display: "flex",
  },
  tooltip: {
    boxSizing: "border-box",
    position: "absolute",
    width: "160px",
    bottom: "100%",
    borderRadius: "3px",
    backgroundColor: "hsla(0, 0%, 20%, 0.9)",
    padding: "7px",
    marginBottom: "5px",
    color: "#fff",
    textAlign: "center",
    fontSize: "14px",
    zIndex: "2",
  },
};

export default function Tooltip({ text, children }) {
  return (
    <Hover>
      {(hovering) => (
        <div style={styles.container}>
          {hovering === true && <div style={styles.tooltip} className="tooltip">{text}</div>}
          {children}
        </div>
      )}
    </Hover>
  );
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
};

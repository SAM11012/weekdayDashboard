import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";

const CustomChip = ({ label, onDelete }) => {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "4px 8px",
        marginRight: "8px",
        backgroundColor: "#f0f0f0",
      }}
    >
      <span style={{ marginRight: "8px" }}>{label}</span>
      {onDelete && (
        <button
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
          onClick={onDelete}
        >
          <CloseIcon
            fontSize="small"
            style={{
              color: "#000",
              transition: "color 0.3s ease, background-color 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#ff0000";
              e.currentTarget.parentElement.style.backgroundColor = "#ff8282";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "#000";
              e.currentTarget.parentElement.style.backgroundColor = "#f0f0f0";
            }}
          />
        </button>
      )}
    </div>
  );
};

CustomChip.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

export default CustomChip;

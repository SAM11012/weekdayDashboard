import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";
import ".././index.css";
export default function MultiInputFilter({ data, setState,name }) {
  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleInputChange = (event, newValue) => {
    setInputValue(newValue);
  };
  const handleOptionChange = (event, newValues) => {
    setSelectedOptions(newValues);
    setState(newValues);
  };
 const filteredOptions = data.filter(
    (option) => !selectedOptions.includes(option)
  );

  const calculateWidth = () => {
    const minWidth = 200; // Minimum width for the TextField
    const additionalWidthPerChip = 90; // Additional width per selected chip
    const totalWidth =
      minWidth + selectedOptions.length * additionalWidthPerChip;
    return totalWidth;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      { (
        <p style={{ marginBottom: "0px", fontWeight: "bold",color:selectedOptions.length>0? 'black':'white' }}>{name}</p>
      )}
      <Autocomplete
        multiple
        value={selectedOptions}
        onChange={handleOptionChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        options={filteredOptions}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              key={index}
              label={option}
              onDelete={() => {
                const newValues = [...selectedOptions];
                newValues.splice(index, 1);
                setSelectedOptions(newValues);
              }}
              {...getTagProps({ index })}
              sx={{
                marginRight: 4,
                borderRadius: "4px",
              }}
              deleteIcon={
                <CloseIcon
                  className="closeIcon"
                  style={{
                    color: "#000",
                    transition: "color 0.3s ease, background-color 0.3s ease", // Transition color and background-color
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = "#ff0000"; // Change icon color on hover
                    //   //e.currentTarget.parentElement.style.backgroundColor =
                    //     "#ff8282"; // Change background color on hover
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = "#000"; // Revert icon color on hover out
                    //   e.currentTarget.parentElement.style.backgroundColor =
                    //     "#f0f0f0"; // Revert background color on hover out
                  }}
                />
              }
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label=""
            placeholder={selectedOptions.length === 0 ? String(name) : ""}
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{
              ...params.InputProps,
              style: { width: calculateWidth() },
            }}
          />
        )}
      />
    </div>
  );
}

import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function SingleInputFilter({ options, setyears, name }) {
  const [selectedExperience, setSelectedExperience] = React.useState(null);
  const workExperienceOptions = options.sort(function(a, b){return a - b});
  const filteredOptions = workExperienceOptions.filter((option) => {
    if (!selectedExperience) {
      return true;
    }

    return option != selectedExperience;
  });

  return (
    <div>
      <p
        style={{
          marginBottom: "0px",
          fontWeight: "bold",
          color: selectedExperience !== null ? "black" : "white",
        }}
      >
        {name}
      </p>
      <Autocomplete
        sx={{ width: 200 }}
        disablePortal
        id="work-experience-filter"
        options={filteredOptions}
        getOptionLabel={(option) => option}
        onChange={(event, newValue) => {
          setSelectedExperience(newValue ? newValue : null);
          setyears(newValue ? newValue : null);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label=""
            placeholder={selectedExperience === null ? String(name) : ""}
          />
        )}
      />
    </div>
  );
}

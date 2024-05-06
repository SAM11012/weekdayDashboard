import React, { useEffect, useState, useRef } from "react";
import JobCard from "./card";
import MultiInputFilter from "./multiselectfilter";
import SingleInputFilter from "./singleSelectFilter";
import { TextField, Grid, CircularProgress, Box } from "@mui/material";
const Placeholders = [
  "Roles",
  "Location",
  "Min Experience",
  "Minimum Pay",
  "Company Name",
];
const Dashboard = () => {
  const [data, setData] = useState(null);
  const [backup, setbackup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobRoles, setjobRoles] = useState([]);
  const [nestedData, setNestedData] = useState(null);
  const [mydata, setTestFiltered] = useState(null);
  const [years, setYears] = useState();
  const [minYears, setMinYears] = useState([]);
  const [minbasepay, setminbasepay] = useState([]);
  const [selectedbase, setselectedbase] = useState();
  const [companylocation, setcompanylocation] = useState([]);
  const [selectCompanylocation, setselectCompanylocation] = useState();
  const [searchcompany, setsearchcompany] = useState("");
  const dashboardRef = useRef(null);
  const jobArray = [];
  const jobroles =
    backup !== null &&
    backup.map((item) =>
      item.jdList.map((jd) => {
        if (jobArray.indexOf(jd.jobRole) === -1) {
          jobArray.push(jd.jobRole);
        }
      })
    );
  const filter = {
    jobRoles: jobRoles,
    years: years,
    minbasepay: selectedbase,
    companylocation: selectCompanylocation,
    companyName: searchcompany,
  };
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            limit: 10,
            offset: data ? data.length : 0, // Set the offset based on current data length
          }),
        }
      );
      if (response.ok) {
        const result = await response.json();
        setData((prevData) => {
          if (Array.isArray(result)) {
            return [...(prevData || []), ...result]; // Concatenate with existing data
          } else if (result) {
            return [...(prevData || []), result]; // Add single item if result is not an array
          } else {
            return prevData || []; // Return existing data if result is falsy
          }
        });
        setbackup((prevData) => {
          if (Array.isArray(result)) {
            return [...(prevData || []), ...result]; // Concatenate with existing data
          } else if (result) {
            return [...(prevData || []), result]; // Add single item if result is not an array
          } else {
            return prevData || []; // Return existing data if result is falsy
          }
        });
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch when component mounts
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchData, searchcompany]); // Listen for changes in loading state

  useEffect(() => {
    if (backup !== null) {
      const flattenedArray = backup.map((item) =>
        item.jdList.flatMap((arr) => arr)
      );
      const finalflat = flattenedArray.flatMap((arr) => arr);
      const filteredfinalflat = filterData(finalflat, filter);
      setNestedData(filteredfinalflat);
      setTestFiltered(filteredfinalflat);
      setMinYears(
        [...new Set(finalflat.map((item) => item.minExp))]
          .filter((value) => value !== null)
          .sort()
      );
      setminbasepay(
        [...new Set(finalflat.map((item) => item.minJdSalary))]
          .filter((value) => value !== null)
          .sort()
      );
      setcompanylocation(
        [...new Set(finalflat.map((item) => item.location))].filter(
          (value) => value !== null
        )
      );
    }
  }, [backup, jobRoles, years, selectedbase, companylocation, searchcompany]);
  const filterData = (data, filter) => {
    if (!data || !Array.isArray(data)) {
      console.error("Invalid data array:", data);
      return [];
    }
    return data.filter((item) => {
      if (
        filter.jobRoles &&
        filter.jobRoles.length > 0 &&
        !filter.jobRoles.includes(item.jobRole)
      ) {
        return false;
      }

      if (
        filter.years !== undefined &&
        filter.years !== null &&
        item.minExp > filter.years
      ) {
        return false;
      }

      if (
        filter.minbasepay !== undefined &&
        item.minJdSalary < filter.minbasepay
      ) {
        return false;
      }

      if (
        filter.companylocation &&
        filter.companylocation.length > 0 &&
        !filter.companylocation.includes(item.location)
      ) {
        return false;
      }

      if (
        filter.companyName &&
        item.companyName
          .toLowerCase()
          .indexOf(filter.companyName.toLowerCase()) === -1
      ) {
        return false;
      }

      return true;
    });
  };

  useEffect(() => {
    const TotalFilteredData = filterData(mydata, filter);
    setNestedData(TotalFilteredData);
  }, [jobRoles, years, selectedbase, selectCompanylocation, searchcompany]);
  console.log(data);
  return (
    <div
      ref={dashboardRef}
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "16px",
          flexWrap: "wrap",
        }}
      >
        <MultiInputFilter
          data={jobArray}
          setState={setjobRoles}
          name={Placeholders[0]}
        />
        <SingleInputFilter
          setyears={setYears}
          options={minYears}
          name={Placeholders[2]}
        />
        <SingleInputFilter
          setyears={setselectedbase}
          options={minbasepay}
          name={Placeholders[3]}
        />
        <MultiInputFilter
          data={companylocation}
          setState={setselectCompanylocation}
          name={Placeholders[1]}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {
            <p
              style={{
                marginBottom: "0",
                fontWeight: "bold",
                color: searchcompany !== "" ? "black" : "white",
              }}
            >
              Select Skills
            </p>
          }
          <TextField
            sx={{ width: 200 }}
            id="outlined-controlled"
            placeholder={Placeholders[4]}
            value={searchcompany}
            onChange={(event) => {
              setsearchcompany(event.target.value);
            }}
          />
        </div>
      </div>

      <h1 style={{ marginBottom: "16px" }}>
        Job Listings
        {nestedData === null ||
        nestedData === undefined ||
        nestedData.length === 0 ? (
          <CircularProgress sx={{ marginLeft: "10px", marginTop: "9px" }} />
        ) : (
          ""
        )}
      </h1>

      <Grid
        container
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          "@media (max-width: 960px)": {
            gridTemplateColumns: "repeat(2, 1fr)",
          },
          "@media (max-width: 600px)": {
            gridTemplateColumns: "repeat(1, 1fr)",
          },
          marginBottom: "16px",
        }}
      >
        {nestedData !== null &&
          nestedData.map((item, index) => {
            return <JobCard key={index} cardData={item} />;
          })}
      </Grid>
    </div>
  );
};

export default Dashboard;

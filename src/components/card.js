import React, { useState } from "react";
import { Card, Button, Avatar } from "@mui/material";
import capitalizeWords from "./utils";
const JobCard = ({ key, cardData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxDescriptionLength = 150;
  const description = cardData.jobDetailsFromCompany;
  const visiblePart = description.slice(0, 300);
  return (
    <Card
      sx={{
        maxWidth: 300,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "translate3D(0, -3px, 0) scale(1.03)",
        },
      }}
    >
      <div style={{ padding: "10px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={cardData.logoUrl}
            style={{ width: "55px", height: "60px", marginRight: "10px" }}
            alt="Company Logo"
          />
          <div style={{ textAlign: "left" }}>
            <p style={{ margin: 0, fontSize: "16px", color: "grey" }}>
              {cardData.companyName}
            </p>
            <p style={{ margin: 0 }}>{capitalizeWords(cardData.jobRole)}</p>
            <p style={{ margin: 0, fontSize: "14px", fontWeight: "bold" }}>
              {capitalizeWords(cardData.location)}
            </p>
          </div>
        </div>
        <p style={{ textAlign: "left" }}>{`Estimated Salary: ${
          cardData.salaryCurrencyCode === "USD" ? "$" : "₹"
        } ${
          cardData.minJdSalary !== null ? cardData.minJdSalary + " - " : ""
        }  ${cardData.maxJdSalary} LPA ✅`}</p>
        <div style={{ textAlign: "left" }}>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "2px",
            }}
          >
            About Company
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "0px",
              marginTop: "0px",
            }}
          >
            About us
          </p>
          <div
            style={{
              textAlign: "left",
              marginBottom: "8px",
              position: "relative",
            }}
          >
            {!isExpanded && (
              <Button
                disableRipple
                variant="text"
                style={{
                  position: "absolute",
                  bottom: 25,
                  left: 80,
                  zIndex: 1,
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  color: "blue",
                  textTransform: "none",
                  fontSize: "16px",
                }}
              >
                View job
              </Button>
            )}
            <div
              style={{
                lineHeight: "1.5",
                position: "relative",
              }}
            >
              {visiblePart}
              {!isExpanded && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>
          </div>

          <p style={{ marginBottom: "4px", color: "grey" }}>
            Minimum Experience:
          </p>
          <p style={{ marginBottom: "8px", marginTop: "0px" }}>{`${
            cardData.minExp === null ? 0 : cardData.minExp
          } years`}</p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "16px",
            marginBottom: "16px",
          }}
        >
          <Button
            variant="contained"
            fullWidth
            style={{
              textTransform: "none",
              backgroundColor: "rgb(85, 239, 196)",
              color: "black",
            }}
            onClick={() => window.open(cardData.jdLink, '_blank')}
          >
            ⚡Apply Now
          </Button>
          <Button
            variant="contained"
            fullWidth
            style={{
              textTransform: "none",
              backgroundColor: "rgb(73, 67, 218)",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src="https://weekday-logos-and-images.s3.eu-north-1.amazonaws.com/Mask+Group.png"
              sx={{ width: 20, height: 30, marginRight: "10px" }}
            />{" "}
            <Avatar
              alt="Remy Sharp"
              src="https://weekday-logos-and-images.s3.eu-north-1.amazonaws.com/Mask+Group(1).png"
              sx={{ width: 20, height: 30, marginRight: "10px" }}
            />
            Unlock Referral Asks
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;

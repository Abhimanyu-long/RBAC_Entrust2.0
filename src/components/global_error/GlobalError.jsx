
import React from "react";

export const GlobalError = () => {

  return (
    <div
      style={{
        backgroundColor: "#ffdddd",
        color: "#d8000c",
        padding: "20px",
        margin: "20px 2rem",
        border: "1px solid #d8000c",
        borderRadius: "5px",
      }}
    >
      <p>
        <strong>Error:</strong>{" "}
        {
         "The server is down or unavailable. Please try again later."
          }
      </p>
    </div>
  );
};


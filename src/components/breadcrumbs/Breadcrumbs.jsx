// Breadcrumbs.js
import { Link, useLocation } from "react-router-dom";
import "../../assets/css/breadcrumbs.css";

export const Breadcrumbs = ({ clientName, caseTitle }) => {
  const location = useLocation();

  // Split the pathname into segments
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Map of route segments to display names
  const segmentNameMap = {
    allclients: "Clients",
    client: "Client",
    case: "Case",
    usermanager: "User Manager",
    userapprovals: "User Approvals",
    rolepermission: "Role Permissions",
    addcase: "Add Case",
    mycase: "My Case",
    managefunds: "Manage Funds",
    approvalestimate: "Approval Estimate",
    myprojects: "My Projects",
    mymembers: "My Members",
    myinvoices: "My Invoices",
    financialactivity: "Financial Activity",
    // Add other mappings as needed
  };

  const processedPathnames = pathnames.map((path, index) => {
    if (!isNaN(Number(path))) {
      const previousPath = pathnames[index - 1];
      if (previousPath === "client" && clientName) {
        return clientName;
      } else if (previousPath === "case" && caseTitle) {
        return caseTitle;
      } else {
        return path;
      }
    } else {
      const mappedName = segmentNameMap[path.toLowerCase()];
      if (mappedName) {
        return mappedName;
      } else {
        return path
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }
    }
  });

  // Set the title to the last segment
  const title = processedPathnames[processedPathnames.length - 1] || "Home";
  const client_data = JSON.parse(sessionStorage.getItem("client_data")) || {};
  let client_localstorage_name = "administrator";

  // Check if client_data is empty, null, or undefined
  if (
    client_data &&
    Object.keys(client_data).length > 0 &&
    client_data.client_name
  ) {
    client_localstorage_name = client_data.client_name;
  }
  return (
    <div
      className="breadcrumb-container"
      style={{
        color: "#003F73",
        borderRadius: "8px",
        padding: "10px 15px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        maxWidth: "100%",
        flexWrap: "wrap",
      }}
    >
      <Link
        className="breadcrumb-title text-gray-900 "
        style={{
          fontSize: "25px",
          fontWeight: "bold",
          whiteSpace: "normal",
          wordBreak: "break-word",
          maxWidth: "100%",
          textAlign: "left",
          lineHeight: "1.5",
        }}
      >
        {client_localstorage_name}{" "}
      </Link>
    </div>
  );
};

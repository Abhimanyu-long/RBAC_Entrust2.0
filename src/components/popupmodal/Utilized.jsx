import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import GenericPage from "../genericpage/GenericPage";
import { Toaster, toast } from "react-hot-toast";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import "../../assets/css/utilizedModal.css"
export const Utilized = () => {
  const { getUtilizedCases } = useAuth();
  const clientDataString = sessionStorage.getItem("client_data");
  const clientData = clientDataString ? JSON.parse(clientDataString) : null;

  const [casesData, setCasesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(null);

  useEffect(() => {
    if (!clientData?.client_id) {
      setError("Client data is missing");
      setLoading(false);
      return;
    }

    const fetchUtilizedCases = async () => {
      try {
        const response = await getUtilizedCases(clientData.client_id);
        if (response?.success) {
          setCasesData(response.data || []);
        } else {
          throw new Error("Failed to fetch cases");
        }
        // console.log("Utilized Cases", response)
      } catch (err) {
        setError(err.message || "Error fetching utilized cases");
        toast.error(err.message || "Error fetching utilized cases");
      } finally {
        setLoading(false);
      }
    };

    fetchUtilizedCases();
  }, [getUtilizedCases, clientData?.client_id]);

  const openPopup = (content) => {
    setPopupContent(content);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupContent(null);
  };

  const columns = [
    {
      field: "project_name",
      header: "Project",
      sortable: true,
      filter: true,
      body: (rowData) => (
        <a
          href={`/myprojects/${rowData.project_id}`}
        >
          {rowData.project_name}
        </a>
      ),
    },
    {
      field: "case_id",
      header: "Case ID",
      sortable: true,
      filter: true,
      body: (rowData) => (
        <a
          href={`/allclients/client/${clientData?.client_id}/case/${rowData.case_id}`}
        >
          {rowData.case_id}
        </a>
      ),
    },
    {
      field: "case_title",
      header: "Title",
      sortable: true,
      filter: true,
      body: (rowData) => (
        <a
          href={`/allclients/client/${clientData?.client_id}/case/${rowData.case_id}`}
        >
          {rowData.case_title}
        </a>
      ),
    },
    
    {
      field: "utilized_amount",
      header: "Utilized Amount",
      sortable: true,
      filter: false,
      body: (rowData) => `$${(rowData.utilized_amount ?? 0).toFixed(2)}`,
    },
    {
      field: "case_status",
      header: "Case Status",
      sortable: true,
      filter: true,
    },
    {
      field: "updated_at",
      header: "Last Updated",
      sortable: true,
      filter: false,
      body: (rowData) =>
        rowData.updated_at
          ? new Date(rowData.updated_at).toLocaleDateString()
          : "N/A",
    },
  ];

  const tabs = [
    {
      label: "All Cases",
      data: casesData,
      columns: columns,
    },
  ];

  return (
    <>
      <GenericPage
        tabs={tabs}
        // tableName="Utilized Cases"
        globalSearchFields={["case_title", "project_name", "case_id", "case_status", "updated_at"]}
        onTabChange={(index, tab) => console.log("Tab changed:", index, tab)}
        showExportButton="true"
        searchPlaceholder = "Search by Case Title, Project Name, Case ID, Case Status and Updated Date"
      />
      <div className="d-flex justify-content-end m-3">
        {/* <button className="btn btn-primary" onClick={exportToExcel}>
          Export to Excel
        </button> */}
      </div>
      {showPopup && (
        <div
          className="popup-overlay"
          onClick={closePopup}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
              height: "auto",
              overflowY: "auto",
              cursor: "move",
            }}
            draggable
          >
            <h5>Details</h5>
            <p>{popupContent}</p>
            <button className="btn btn-danger mt-3" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
};

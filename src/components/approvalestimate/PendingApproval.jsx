import React, { useState, useEffect, Suspense, lazy } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { useAuth } from "../../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import "primereact/resources/themes/saga-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons
import "../../assets/css/genericCases.css";
import "../../assets/css/genericPage.css";
import "../../assets/css/TransactionHistory.css";
const Loader = lazy(() => import("../Loader/Loader"));
const CountdownModal = lazy(() => import("./CountdownModal"));

export const PendingApproval = () => {
  const {
    getPaymentApprovalEstimates,
    sendApprovalEstimateData,
    getBankBalanceDashboard,
  } = useAuth();

  const [caseData, setCaseData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [initialBalance, setInitialBalance] = useState(0); // Initial balance from API
  const clientData = JSON.parse(sessionStorage.getItem("client_data")) || {};
  const [loading, setLoading] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);

  // Calculate derived values based on selections
  const totalApproved = caseData.reduce((sum, caseItem) => {
    const action = selectedOptions[caseItem.case_id];
    return action === "1" ? sum + caseItem.amount : sum;
  }, 0);

  const computedLiveBalance = initialBalance - totalApproved;
  const computedRequiredFund = computedLiveBalance < 0 ? Math.abs(computedLiveBalance) : 0;
  const displayLiveBalance = computedLiveBalance < 0 ? 0 : computedLiveBalance;

  const fetchEstimates = async () => {
    setLoading(true);
    try {
      const estimates = await getPaymentApprovalEstimates(clientData.client_id);
      setCaseData(Array.isArray(estimates) ? estimates : []);
    } catch (err) {
      console.error("Error fetching estimates:", err);
      toast.error("Failed to load data. Please try again.");
      setCaseData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchLiveBalance = async () => {
    try {
      const response = await getBankBalanceDashboard(clientData.client_id);
      setInitialBalance(response.data?.balance || 0);
    } catch (error) {
      console.error("Error fetching balance:", error);
      setInitialBalance(0);
    }
  };

  useEffect(() => {
    fetchEstimates();
    fetchLiveBalance();
  }, [
    getPaymentApprovalEstimates,
    getBankBalanceDashboard,
    clientData.client_id,
  ]);

  // Simplified radio button handler
  const onRadioButtonChange = (rowData, value) => {
    setSelectedOptions(prev => ({ ...prev, [rowData.case_id]: value }));
  };

  const radioButtonTemplate = (rowData) => (
    <div className="d-flex align-items-center gap-2 p-2 rounded">
      <div className="d-flex align-items-center">
        <RadioButton
          inputId={`approve-${rowData.case_id}`}
          name={`option-${rowData.case_id}`}
          value="1"
          checked={selectedOptions[rowData.case_id] === "1"}
          onChange={() => onRadioButtonChange(rowData, "1")}
          style={{
            accentColor: selectedOptions[rowData.case_id] === "1" ? "green" : undefined,
          }}
        />
        <label
          htmlFor={`approve-${rowData.case_id}`}
          style={{
            color: selectedOptions[rowData.case_id] === "1" ? "green" : "inherit",
          }}
        >
          Approve
        </label>
      </div>
      <div className="d-flex align-items-center">
        <RadioButton
          inputId={`reject-${rowData.case_id}`}
          name={`option-${rowData.case_id}`}
          value="2"
          checked={selectedOptions[rowData.case_id] === "2"}
          onChange={() => onRadioButtonChange(rowData, "2")}
          style={{
            accentColor: selectedOptions[rowData.case_id] === "2" ? "red" : undefined,
          }}
        />
        <label
          htmlFor={`reject-${rowData.case_id}`}
          style={{
            color: selectedOptions[rowData.case_id] === "2" ? "red" : "inherit",
          }}
        >
          Reject
        </label>
      </div>
      <div className="d-flex align-items-center">
        <RadioButton
          inputId={`no-action-${rowData.case_id}`}
          name={`option-${rowData.case_id}`}
          value="0"
          checked={selectedOptions[rowData.case_id] === "0"}
          onChange={() => onRadioButtonChange(rowData, "0")}
        />
        <label
          htmlFor={`no-action-${rowData.case_id}`}
          style={{ cursor: "pointer" }}
        >
          No Action
        </label>
      </div>
    </div>
  );

  const handleProceed = async () => {
    if (Object.keys(selectedOptions).length === 0) {
      toast.error("Please select at least one action");
      return;
    }

    const approvalData = caseData
      .filter(caseItem => selectedOptions[caseItem.case_id] !== "0")
      .map(caseItem => ({
        ...caseItem,
        action: parseInt(selectedOptions[caseItem.case_id])
      }));

    try {
      const response = await sendApprovalEstimateData(
        clientData.client_id,
        approvalData
      );
      
      if (response.status === 200 || response.status === 201) {
        if (response.data?.redirect) {
          setShowCountdown(true);
        } else {
          toast.success("Processing successful!");
          fetchEstimates();
        }
      }
    } catch (err) {
      toast.error("Failed to process approvals");
    }
  };

  const amountTemplate = (rowData) => {
    return `$${rowData.amount.toFixed(2)}`;
  };

  const dateTemplate = (rowData) => {
    return new Date(rowData.date).toLocaleDateString();
  };
  const paginatorTemplate = {
    layout: "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink",
    FirstPageLink: (options) => (
      <button
        onClick={options.onClick}
        disabled={options.disabled}
        className="btn btn-sm btn-outline-primary me-1"
      >
        <i className="bi bi-chevron-double-left"></i>
      </button>
    ),
    PrevPageLink: (options) => (
      <button
        onClick={options.onClick}
        disabled={options.disabled}
        className="btn btn-sm btn-outline-primary me-1"
      >
        <i className="bi bi-chevron-left"></i>
      </button>
    ),
    PageLinks: (options) => (
      <button
        onClick={options.onClick}
        className={`btn btn-sm ${options.className}`}
        disabled={options.disabled}
        style={{
          fontSize: "12px",
          padding: "0.25rem 0.5rem",
          backgroundColor: options.active ? "#4fc9da" : "#4fc9da",
          color: options.active ? "white" : "black",
          border: options.active ? "none" : "1px solid #ccc",
        }}
      >
        {options.page + 1}
      </button>
    ),
    NextPageLink: (options) => (
      <button
        onClick={options.onClick}
        disabled={options.disabled}
        className="btn btn-sm btn-outline-primary ms-1"
        style={{ fontSize: "12px", padding: "0.25rem 0.5rem" }}
      >
        <i className="bi bi-chevron-right"></i>
      </button>
    ),
    LastPageLink: (options) => (
      <button
        onClick={options.onClick}
        disabled={options.disabled}
        className="btn btn-sm btn-outline-primary ms-1"
        style={{ fontSize: "12px", padding: "0.25rem 0.5rem" }}
      >
        <i className="bi bi-chevron-double-right"></i>
      </button>
    ),
  };

  if (loading) {
    return <Loader />;
  }

  console.log("caseData", caseData);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="container">
          <div
            className="form-item d-flex align-items-center justify-content-center border rounded"
            style={{
              backgroundColor: "#4fc9da",
              padding: "0.75rem 1rem",
            }}
          >
            <h5 className="modal-title text-center w-100 font-weight-bold text-black">
              Approve Estimate For Cases
            </h5>
          </div>

          <div className="table-responsive">
            <DataTable
              value={caseData}
              paginator
              paginatorTemplate={{
                layout: "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink",
                FirstPageLink: (options) => (
                  <button
                    onClick={options.onClick}
                    disabled={options.disabled}
                    className="btn btn-sm btn-outline-primary me-1"
                  >
                    <i className="bi bi-chevron-double-left"></i>
                  </button>
                ),
                PrevPageLink: (options) => (
                  <button
                    onClick={options.onClick}
                    disabled={options.disabled}
                    className="btn btn-sm btn-outline-primary me-1"
                  >
                    <i className="bi bi-chevron-left"></i>
                  </button>
                ),
                PageLinks: (options) => (
                  <button
                    onClick={options.onClick}
                    className={`btn btn-sm ${options.className}`}
                    disabled={options.disabled}
                    style={{
                      fontSize: "12px",
                      padding: "0.25rem 0.5rem",
                      backgroundColor: options.active ? "#4fc9da" : "#4fc9da",
                      color: options.active ? "white" : "black",
                      border: options.active ? "none" : "1px solid #ccc",
                    }}
                  >
                    {options.page + 1}
                  </button>
                ),
                NextPageLink: (options) => (
                  <button
                    onClick={options.onClick}
                    disabled={options.disabled}
                    className="btn btn-sm btn-outline-primary ms-1"
                    style={{ fontSize: "12px", padding: "0.25rem 0.5rem" }}
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                ),
                LastPageLink: (options) => (
                  <button
                    onClick={options.onClick}
                    disabled={options.disabled}
                    className="btn btn-sm btn-outline-primary ms-1"
                    style={{ fontSize: "12px", padding: "0.25rem 0.5rem" }}
                  >
                    <i className="bi bi-chevron-double-right"></i>
                  </button>
                ),
              }}
              rows={10}
              emptyMessage="No data found."
              scrollable
              className="custom-table"
            >
              <Column
                header={`Sr${"\u00A0"}No`}
                body={(rowData, { rowIndex }) => rowIndex + 1}
              />
              <Column
                field="case_id"
                headerStyle={{ textAlign: "center" }}
                header={`Case${"\u00A0"}ID`}
              />
              <Column
                field="request_id"
                header="Request ID"
                headerStyle={{ textAlign: "center" }}
                body={(rowData) => rowData.request_id || "NA"}
              />
              <Column
                field="case_title"
                header="Title"
                headerStyle={{ textAlign: "center" }}
              />
              <Column
                field="amount"
                header="Amount $"
                headerStyle={{ textAlign: "center" }}
                body={(rowData) => `$${rowData.amount.toFixed(2)}`}
              />
              <Column
                field="description"
                header="Description"
                headerStyle={{ textAlign: "center" }}
                body={(rowData) => rowData.request_id || "NA"}
              />
              <Column header="Action" body={radioButtonTemplate} />
            </DataTable>
          </div>

          <div className="mt-3 d-flex justify-content-between">
            <strong>Available Fund: ${displayLiveBalance.toFixed(2)}</strong>
            <strong>Required Fund: ${computedRequiredFund.toFixed(2)}</strong>
          </div>
          <div className="mt-4 text-center">
            <Button
              label="Proceed"
              icon="pi pi-check"
              className=""
              onClick={handleProceed}
              style={{ backgroundColor: "#4fc9da" }}
              disabled={Object.keys(selectedOptions).length === 0}
            />
          </div>
        </div>

        {/* Show Countdown Modal when triggered */}
        {showCountdown && (
          <CountdownModal
            seconds={3}
            onComplete={() => (window.location.href = "/managefunds")}
          />
        )}

        <Toaster />
      </Suspense>
    </>
  );
};
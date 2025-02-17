import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import toast from "react-hot-toast";
import { Modal } from "react-bootstrap";
import Select from 'react-select'; // Assuming you're using react-select

export const ClientSetup = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isValidFrom, setIsValidFrom] = useState(null);
  const [isValidTill, setIsValidTill] = useState(null);
  const [isPromocode, setIsPromocode] = useState("");
  const [isReferralAccount, setIsReferralAccount] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [skipDateSettings, setSkipDateSettings] = useState(false);
  const [percentage, setPercentage] = useState();
  const [initialFunds, setInitialFunds] = useState(null);
  const [cashbackType, setCashbackType] = useState(null);
  const [clientManager, setClientManager] = useState([]);
  const [clientManagerOptions, setClientManagerOptions] = useState([]);
  const [operationalManager, setOperationalManager] = useState([]);
  const [operationalManagerOptions, setOperationalManagerOptions] = useState([]);
  const [groupSelector, setGroupSelector] = useState([]);
  const [groupSelect, setGroupSelect] = useState([]);
  const [isCheckedReferralAccount, setIsCheckedReferralAccount] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientOptions, setClientOptions] = useState([]);

  const { getAllUsers, getManagers, approveUserProfile, getAllClients, fetchUserGroups, getClientRelatedRoles } = useAuth();

  const fetchUsers = async () => {
    try {
      const userData = await getAllUsers();
      if (Array.isArray(userData.data)) {
        setUsers(userData.data);
      } else {
        console.error("API returned data that is not an array:", userData);
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error.message);
      setUsers([]);
    }
  };

  const fetchRoles = async () => {
    const rolesData = JSON.parse(sessionStorage.getItem("roles")) || [];
    try {
      const response = await getClientRelatedRoles(rolesData[0]?.role_id);
      const formattedRoles = response.map((role) => ({
        value: role.role_id,
        label: role.role_name,
      }));
      setRoles(formattedRoles);
    } catch (error) {
      console.error("Error fetching roles:", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    if (showModal) {
      setClientManager(null);
      setOperationalManager(null);
      setGroupSelector([]);
      setErrors({});
    }
  }, [showModal]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser) {
      alert("Please select a user to approve.");
      return;
    }

    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    const requestData = {
      approval_id: selectedUser,
      client_manager_id: clientManager?.value,
      operational_manager_id: operationalManager?.value,
      entrust_project_type_based_groups: groupSelector?.map((group) => group.value),
      restrict_domain_for_users: 1,
      referral_account_type: 1,
      is_referral_account: isCheckedReferralAccount ? 1 : 0,
      invoice_code: isPromocode,
      referred_by: selectedClient?.value,
      referral_start_date: isValidFrom,
      referral_end_date: isValidTill,
      approved_client_role_id: selectedRole?.value,
      skip_date: skipDateSettings ? 1 : 0,
      referral_percentage: parseFloat(percentage),
      initial_fund: Number(initialFunds),
      referral_cashback_type: cashbackType,
    };

    try {
      const response = await approveUserProfile(requestData);
      if (response?.message) {
        toast.success(response.message);
      } else {
        toast.success("User approved successfully!");
      }

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.approval_id !== selectedUser)
      );
      handleCloseModal();
      fetchUsers();
    } catch (error) {
      console.log("Error approving user profile:", error);
      toast.error(error.message || "An error occurred while approving the user profile.");
    }
  };

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const managers = await getManagers();
        const groupdata = await fetchUserGroups();
        const options = managers.map((manager) => ({
          value: manager.user_id,
          label: manager.username,
        }));
        setClientManagerOptions(options);
        setOperationalManagerOptions(options);

        const groupoption = groupdata.map((group) => ({
          value: group.id,
          label: group.name,
        }));
        setGroupSelect(groupoption);
      } catch (error) {
        console.error("Error fetching managers:", error.message);
      }
    };

    fetchManagers();
  }, [getManagers]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clients = await getAllClients();
        const options = clients.map((client) => ({
          value: client.client_id,
          label: client.client_name,
        }));
        setClientOptions(options);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  const handleClientChange = (selectedOption) => {
    setSelectedClient(selectedOption);
  };

  const validateFields = () => {
    const newErrors = {};
    if (!clientManager) newErrors.clientManager = "Client Manager is required.";
    if (!operationalManager)
      newErrors.operationalManager = "Operational Manager is required.";
    if (!groupSelector || groupSelector.length === 0)
      newErrors.groupSelector = "At least one group must be selected.";
    return newErrors;
  };

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>CLIENT SETUP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit}>
            <div className="container mb-4">
              <div className="row">
                <div className="col-md-6">
                  <label>
                    CLIENT MANAGER<span style={{ color: "red" }}>*</span>
                  </label>
                  <Select
                    value={clientManager}
                    onChange={setClientManager}
                    options={clientManagerOptions}
                    className="custom-select fs-7"
                    placeholder="Choose managers..."
                  />
                  {errors.clientManager && <div className="text-danger mt-1">{errors.clientManager}</div>}
                </div>
                <div className="col-md-6">
                  <label>
                    OPERATIONAL MANAGER<span style={{ color: "red" }}>*</span>
                  </label>
                  <Select
                    value={operationalManager}
                    onChange={setOperationalManager}
                    options={operationalManagerOptions}
                    className="custom-select fs-7"
                    placeholder="Choose an Operational..."
                  />
                  {errors.operationalManager && <div className="text-danger mt-1">{errors.operationalManager}</div>}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>
                    GROUP SELECT<span style={{ color: "red" }}>*</span>
                  </label>
                  <Select
                    value={groupSelector}
                    onChange={setGroupSelector}
                    options={groupSelect}
                    isMulti
                    className="custom-select fs-8"
                    placeholder="Choose a group"
                  />
                  {errors.groupSelector && <div className="text-danger mt-1">{errors.groupSelector}</div>}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>PROMO CODE</label>
                  <input
                    type="text"
                    className="custom-select fs-8"
                    value={isPromocode}
                    onChange={(e) => setIsPromocode(e.target.value)}
                    placeholder="Enter promo code"
                  />
                </div>
                {selectedRole && (
                  <div className="col-md-6">
                    <label>ROLE</label>
                    <Select
                      value={selectedRole}
                      onChange={setSelectedRole}
                      options={roles}
                      className="custom-select fs-8"
                      placeholder="Choose a role"
                    />
                  </div>
                )}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>REFERRED BY</label>
                  <input
                    type="text"
                    className="custom-select fs-8"
                    placeholder="Referred by"
                    value={isReferralAccount}
                    onChange={(e) => setIsReferralAccount(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label>REFERRAL CLIENT</label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select p-3"
                    value={selectedClient}
                    isClearable
                    isSearchable
                    name="client"
                    placeholder="Choose an existing client"
                    onChange={handleClientChange}
                    options={clientOptions}
                  />
                </div>
              </div>
              {selectedClient && (
                <>
                  <div className="row">
                    <div className="col-md-6">
                      <label>VALID FROM</label>
                      <input
                        type="date"
                        className="form-control-date p-2 fs-8 w-100"
                        value={isValidFrom}
                        onChange={(e) => setIsValidFrom(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label>VALID TILL</label>
                      <input
                        type="date"
                        className="form-control-date p-2 fs-8 w-100"
                        value={isValidTill}
                        onChange={(e) => setIsValidTill(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mt-2">
                    <div className="form-check d-flex align-items-center">
                      <input
                        className="form-check-input custom-checkbox"
                        type="checkbox"
                        id="skipDateSettings"
                        checked={skipDateSettings}
                        onChange={() => setSkipDateSettings(!skipDateSettings)}
                      />
                      <label htmlFor="skipDateSettings">SKIP DATE SETTINGS</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>PERCENTAGE</label>
                      <input
                        type="text"
                        className="custom-select fs-8"
                        placeholder="Enter percentage"
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label>INITIAL FUNDS</label>
                      <input
                        type="text"
                        className="custom-select fs-8"
                        placeholder="Enter initial funds"
                        value={initialFunds}
                        onChange={(e) => setInitialFunds(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mt-2">
                      <label className="form-label">REFERRAL CASHBACK TYPE</label>
                      <div className="mb-4 d-flex align-items-center">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="balance"
                            name="invoiceConfig"
                            value="Balance"
                            checked={cashbackType === "Balance"}
                            onChange={(e) => setCashbackType(e.target.value)}
                          />
                          <label htmlFor="balance" className="form-check-label fs-8 mx-2">Balance</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="cheque"
                            name="invoiceConfig"
                            value="Cheque"
                            checked={cashbackType === "Cheque"}
                            onChange={(e) => setCashbackType(e.target.value)}
                          />
                          <label htmlFor="cheque" className="form-check-label fs-8 mx-2">Cheque</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="mt-4">
                <button type="submit" disabled={loading} className="btn btn-primary w-100">
                  <b>{loading ? "Processing..." : "Confirm Setup And Approve"}</b>
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

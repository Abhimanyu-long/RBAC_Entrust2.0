import React from 'react'

export const ViewAndUpdateDetails = () => {
  return (
    <>
     {showPopup && selectedUser && (
          <div className="popup-modal">
            <div className="popup-content">
              <span className="close-btn" onClick={() => togglePopup(null)}>
                &times;
              </span>

              <div className="card-header">
                <div className="card-title text-center">
                  <h3>User Details</h3>
                </div>
              </div>

              <div className="card mb-5 mb-xl-10">
                <div
                  className="card-body p-0"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px dashed #000000",
                  }}
                >
                  <div
                    className="table-responsive"
                    style={{ maxHeight: "500px" }}
                  >
                    <table className="table align-middle table-row-bordered table-bordered gs-9">
                      <thead className="bg-secondary text-white">
                        <tr>
                          <th className="text-center">Request Fields</th>
                          <th className="text-center">Provided Details</th>
                          <th className="text-center">Approved Details</th>
                        </tr>
                      </thead>
                      <tbody style={{ overflowY: "auto" }}>
                        <tr>
                          <td style={tableCellStyle}>User Name</td>
                          <td style={tableCellStyle}>
                            {viewDetails.client_username || "N/A"}
                          </td>
                          <td style={tableCellStyle}>
                            {isEditMode ? (
                              <input
                                className="full-width w-100"
                                type="text"
                                value={editedDetails.client_username || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    "client_username",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              editedDetails.client_username || "N/A"
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td style={tableCellStyle}>E-Mail</td>
                          <td style={tableCellStyle}>
                            {viewDetails.client_email || "N/A"}
                          </td>

                          <td style={tableCellStyle}>
                            {isEditMode ? (
                              <input
                                className="full-width"
                                type="text"
                                value={editedDetails.client_email || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    "client_email",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              editedDetails.client_email || "N/A"
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td style={tableCellStyle}>Full Name</td>
                          <td style={tableCellStyle}>
                            {viewDetails.client_full_name || "N/A"}
                          </td>
                          <td style={tableCellStyle}>
                            {isEditMode ? (
                              <input
                                className="full-width"
                                type="text"
                                value={editedDetails.client_full_name || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    "client_full_name",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              editedDetails.client_full_name || "N/A"
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td style={tableCellStyle}>Job Title</td>
                          <td style={tableCellStyle}>
                            {viewDetails.client_designation || "N/A"}
                          </td>
                          <td style={tableCellStyle}>
                            {isEditMode ? (
                              <input
                                className="full-width"
                                type="text"
                                value={editedDetails.client_designation || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    "client_designation",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              editedDetails.client_designation || "N/A"
                            )}
                          </td>
                        </tr>

                        <tr>
                          <td style={tableCellStyle}>D.O.B</td>
                          <td style={tableCellStyle}>
                            {viewDetails.dob || "N/A"}
                          </td>
                          <td style={tableCellStyle}>
                            {isEditMode ? (
                              <input
                                className="full-width"
                                type="date"
                                value={editedDetails.dob || ""}
                                onChange={(e) =>
                                  handleInputChange("dob", e.target.value)
                                }
                              />
                            ) : (
                              editedDetails.dob || "N/A"
                            )}
                          </td>
                        </tr>

                        <tr>
                          <td style={tableCellStyle}>
                            Is Authorised Signatory
                          </td>

                          {/* Display non-editable value */}
                          <td style={tableCellStyle}>
                            {viewDetails.is_authorised_signatory === 1
                              ? "Yes"
                              : "No"}
                          </td>

                          {/* Edit mode handling */}
                          <td style={tableCellStyle}>
                            {
                              isEditMode ? (
                                <input
                                  type="checkbox"
                                  checked={
                                    editedDetails.is_authorised_signatory === 1
                                  }
                                  onChange={(e) =>
                                    handleInputChange(
                                      "is_authorised_signatory",
                                      e.target.checked ? 1 : 0 // Convert checkbox state to 1 or 0
                                    )
                                  }
                                />
                              ) : editedDetails.is_authorised_signatory ===
                                1 ? (
                                "Yes"
                              ) : (
                                "No"
                              ) // Display Yes/No
                            }
                          </td>
                        </tr>

                        <tr>
                          <td style={tableCellStyle}>
                            Authorised Signatory Full Name
                          </td>
                          <td style={tableCellStyle}>
                            {viewDetails.authorised_signatory_full_name ||
                              "N/A"}
                          </td>
                          <td style={tableCellStyle}>
                            {isEditMode ? (
                              <input
                                className="full-width"
                                type="text"
                                value={
                                  editedDetails.authorised_signatory_full_name ||
                                  ""
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    "authorised_signatory_full_name",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              editedDetails.authorised_signatory_full_name ||
                              "N/A"
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td style={tableCellStyle}>
                            Authorised Signatory Job Title
                          </td>
                          <td style={tableCellStyle}>
                            {viewDetails.authorised_signatory_designation ||
                              "N/A"}
                          </td>
                          <td style={tableCellStyle}>
                            {isEditMode ? (
                              <input
                                type="text"
                                className="full-width"
                                value={
                                  editedDetails.authorised_signatory_designation ||
                                  ""
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    "authorised_signatory_designation",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              editedDetails.authorised_signatory_designation ||
                              "N/A"
                            )}
                          </td>
                        </tr>

                        <tr>
                          <td style={tableCellStyle}>
                            Authorised Signatory E-Mail Address
                          </td>
                          <td style={tableCellStyle}>
                            {viewDetails.authorised_signatory_email || "N/A"}
                          </td>
                          <td style={tableCellStyle}>
                            {isEditMode ? (
                              <input
                                type="text"
                                className="full-width"
                                value={
                                  editedDetails.authorised_signatory_email || ""
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    "authorised_signatory_email",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              editedDetails.authorised_signatory_email || "N/A"
                            )}
                          </td>
                        </tr>

                        <tr>
                          <td style={tableCellStyle}>Authorised D.O.B</td>
                          <td style={tableCellStyle}>
                            {viewDetails.authorised_signatory_dob || "N/A"}
                          </td>
                          <td style={tableCellStyle}>
                            {isEditMode ? (
                              <input
                                className="full-width"
                                type="date"
                                value={
                                  editedDetails.authorised_signatory_dob || ""
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    "authorised_signatory_dob",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              editedDetails.authorised_signatory_dob || "N/A"
                            )}
                          </td>
                        </tr>

                        <tr>
                          <td style={tableCellStyle}>Organization/Firm</td>
                          <td style={tableCellStyle}>
                            {viewDetails.organization_name || "N/A"}
                          </td>
                          <td style={tableCellStyle}>
                            {isEditMode ? (
                              <input
                                type="text"
                                className="full-width"
                                value={editedDetails.organization_name || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    "organization_name",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              editedDetails.organization_name || "N/A"
                            )}
                          </td>
                        </tr>

                        <tr>
                          <td style={tableCellStyle}>Organization Email</td>
                          <td style={tableCellStyle}>
                            {viewDetails.organization_email || "N/A"}
                          </td>
                          <td style={tableCellStyle}>
                            {isEditMode ? (
                              <input
                                type="text"
                                className="full-width"
                                value={editedDetails.organization_email || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    "organization_email",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              editedDetails.organization_email || "N/A"
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td style={tableCellStyle}>Address Line1</td>
                          <td style={tableCellStyle}>
                            {viewDetails.address_line1 || "N/A"}
                          </td>
                          <td style={tableCellStyle}>
                            {isEditMode ? (
                              <input
                                className="full-width"
                                type="text"
                                value={editedDetails.address_line1 || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    "address_line1",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              editedDetails.address_line1 || "N/A"
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td style={tableCellStyle}>Address Line2</td>
                          <td style={tableCellStyle}>
                            {viewDetails.address_line2 || "N/A"}
                          </td>
                          <td style={tableCellStyle}>
                            {isEditMode ? (
                              <input
                                className="full-width"
                                type="text"
                                value={editedDetails.address_line2 || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    "address_line2",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              editedDetails.address_line2 || "N/A"
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td style={tableCellStyle}>Postal Code</td>
                          <td style={tableCellStyle}>
                            {viewDetails.postal_code || "N/A"}
                          </td>
                          <td style={tableCellStyle}>
                            {isEditMode ? (
                              <input
                                className="full-width"
                                type="text"
                                value={editedDetails.postal_code || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    "postal_code",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              editedDetails.postal_code || "N/A"
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td style={tableCellStyle}>Country</td>
                          <td style={tableCellStyle}>
                            {viewDetails.country || "N/A"}
                          </td>
                          <td style={tableCellStyle}>
                            {isEditMode ? (
                              <input
                                className="full-width"
                                type="text"
                                value={editedDetails.country || ""}
                                onChange={(e) =>
                                  handleInputChange("country", e.target.value)
                                }
                              />
                            ) : (
                              editedDetails.country || "N/A"
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td style={tableCellStyle}>State</td>
                          <td style={tableCellStyle}>
                            {viewDetails.state || "N/A"}
                          </td>
                          <td style={tableCellStyle}>
                            {isEditMode ? (
                              <input
                                className="full-width"
                                type="text"
                                value={editedDetails.state || ""}
                                onChange={(e) =>
                                  handleInputChange("state", e.target.value)
                                }
                              />
                            ) : (
                              editedDetails.state || "N/A"
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td style={tableCellStyle}>City</td>
                          <td style={tableCellStyle}>
                            {viewDetails.city || "N/A"}
                          </td>
                          <td style={tableCellStyle}>
                            {isEditMode ? (
                              <input
                                className="full-width"
                                type="text"
                                value={editedDetails.city || ""}
                                onChange={(e) =>
                                  handleInputChange("city", e.target.value)
                                }
                              />
                            ) : (
                              editedDetails.city || "N/A"
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td style={tableCellStyle}>Contact No</td>
                          <td style={tableCellStyle}>
                            {viewDetails.contact_number || "N/A"}
                          </td>
                          <td style={tableCellStyle}>
                            {isEditMode ? (
                              <input
                                className="full-width"
                                type="text"
                                value={editedDetails.contact_number || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    "contact_number",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              editedDetails.contact_number || "N/A"
                            )}
                          </td>
                        </tr>

                        <tr>
                          <td style={tableCellStyle}>Landline No</td>
                          <td style={tableCellStyle}>
                            {viewDetails.landline_no || "N/A"}
                          </td>
                          <td style={tableCellStyle}>
                            {isEditMode ? (
                              <input
                                className="full-width"
                                type="text"
                                value={editedDetails.landline_no || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    "landline_no",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              editedDetails.landline_no || "N/A"
                            )}
                          </td>
                        </tr>

                        <tr>
                          <td style={tableCellStyle}>Extn.</td>
                          <td style={tableCellStyle}>
                            {viewDetails.extension_no || "N/A"}
                          </td>
                          <td style={tableCellStyle}>
                            {isEditMode ? (
                              <input
                                className="full-width"
                                type="text"
                                value={editedDetails.extension_no || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    "extension_no",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              editedDetails.extension_no || "N/A"
                            )}
                          </td>
                        </tr>

                        <tr>
                          <td style={tableCellStyle}>Website</td>
                          <td style={tableCellStyle}>
                            {viewDetails.website || "N/A"}
                          </td>
                          <td style={tableCellStyle}>
                            {isEditMode ? (
                              <input
                                className="full-width"
                                type="text"
                                value={editedDetails.website || ""}
                                onChange={(e) =>
                                  handleInputChange("website", e.target.value)
                                }
                              />
                            ) : (
                              editedDetails.website || "N/A"
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td style={tableCellStyle}>Activation Code</td>
                          <td style={tableCellStyle}>
                            {viewDetails.activation_code || "N/A"}
                          </td>
                          <td style={tableCellStyle}>
                            {isEditMode ? (
                              <input
                                className="full-width"
                                type="text"
                                value={editedDetails.activation_code || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    "activation_code",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              editedDetails.activation_code || "N/A"
                            )}
                          </td>
                        </tr>

                        <tr>
                          <td style={tableCellStyle}>Referred By</td>
                          <td style={tableCellStyle}>
                            {viewDetails.referred_by || "N/A"}
                          </td>
                          <td style={tableCellStyle}>
                            {isEditMode ? (
                              <input
                                className="full-width"
                                type="text"
                                value={editedDetails.referred_by || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    "referred_by",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              editedDetails.referred_by || "N/A"
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {isEditMode ? (
                  <button
                    className="btn btn-primary text-end btn-sm"
                    onClick={handleSave}
                    style={{
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    Update
                  </button>
                ) : (
                  editedDetails &&
                  editedDetails.is_approved === 0 &&
                  editedDetails.is_rejected === 0 && (
                    <button
                      className="btn btn-primary"
                      onClick={handleEdit}
                      style={{
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}
    </>
  )
}

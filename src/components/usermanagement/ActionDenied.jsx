import React from 'react'
import toast, { Toaster } from "react-hot-toast";
import { Modal } from "react-bootstrap";

export const ActionDenied = ({ showMessage, handleCloseModalMessage }) => {
  return (
    <>
     <Modal show={showMessage} onHide={handleCloseModalMessage} centered>
          <Modal.Body className="p-4">
            <div className="d-flex flex-column align-items-center">
              <div className="text-danger mb-3">
                <i
                  className="bi bi-exclamation-triangle-fill"
                  style={{ fontSize: "2rem" }}
                ></i>
              </div>
              <h5 className="text-center mb-3">Action Denied</h5>
              <p className="text-center">
                Cannot approve. The user has not verified their email yet.
              </p>
              <button
                className="btn btn-danger mt-3 px-4"
                onClick={handleCloseModalMessage}
              >
                Close
              </button>
            </div>
          </Modal.Body>
        </Modal>
    </>
  )
}

import React, { useState, useEffect } from "react";
import "../../assets/css/fundrelated.css"


const CountdownModal = ({ seconds = 3, onComplete }) => {
  const [countdown, setCountdown] = useState(seconds);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (countdown <= 0) {
      setIsOpen(false);
      if (onComplete) onComplete(); // Call redirect or any function
      return;
    }

    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="modal fade show d-block custom-backdrop" tabIndex="-1" role="dialog" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content border-0 shadow-lg rounded-3">
        {/* Modal Header */}
        <div className="modal-header bg-dark text-white text-center">
          <h5 className="modal-title w-100 blink display-4 fw-bold">{countdown}</h5>
        </div>
        {/* Modal Body */}
        <div className="modal-body text-center mb-6 mt-2">
          <p className="fs-4 fw-bold text-danger">⚠️ Insufficient Funds!</p>
          <p className="fs-5 text-light">Redirecting to Add Funds page...</p>
          
        </div>
      </div>
    </div>
  </div>
  

  );
};

export default CountdownModal;

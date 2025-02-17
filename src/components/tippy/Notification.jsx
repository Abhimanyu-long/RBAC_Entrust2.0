import React from "react";
import { useNotifications } from "./useNotifications";

export const Notification = () => {
  const {
    notifications,
    loading,
    loadingMore,
    noMoreData,
    error,
    loadMore,
    singleDeleteNotification,
    clearNotifications,
    totalCount,
  } = useNotifications();

  const formatDateWithoutYear = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div
      className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-light fw-semibold fs-6 w-lg-300px show"
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        backgroundColor: "#ebfcff",
      }}
    >
      {/* Header */}
      <div
        className="d-flex flex-column flex-center bgi-no-repeat rounded-top px-6 py-4"
        style={{
          backgroundColor: "#008abb",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <h4 className="text-white fw-semibold mb-1">
          Notifications{" "}
          <span className="fs-8 opacity-75 ps-2">
            {totalCount} {totalCount === 1 ? "record" : "records"}
          </span>
        </h4>
      </div>

      {/* Error */}
      {error && (
        <div className="alert alert-danger m-2 p-2" role="alert">
          {error}
        </div>
      )}

      {/* Notifications List */}
      <div
        className="p-3"
        style={{
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        {loading && notifications.length === 0 ? (
          <div className="text-center text-muted">
            <i className="fas fa-spinner fa-spin fs-3 mb-2"></i>
            <p>Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center text-muted">
            <i className="fas fa-bell-slash fs-3 mb-2"></i>
            <p>No new notifications at the moment!</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              className="d-flex align-items-center py-2 mb-2 bg-light notification-item"
              key={notification.user_notification_id}
              style={{
                borderRadius: "0.375rem",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                padding: "8px",
              }}
            >
              {/* Icon */}
              <div>
                <i
                  className={`me-3 ${notification.icon || "fas fa-info-circle"}`}
                  style={{
                    fontSize: "1.25rem",
                    color:
                      notification.status === "badge-danger"
                        ? "#e74c3c"
                        : "#28a745",
                  }}
                />
              </div>

              {/* Message and Date */}
              <div className="d-flex flex-column w-100">
                <div className="d-flex justify-content-between align-items-start">
                  <span
                    className="text-dark fw-semibold"
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: "1.2",
                      wordBreak: "break-word",
                      maxWidth: "80%",
                    }}
                  >
                    {notification.message || "Notification"}
                  </span>
                  <span
                    className="fs-8 text-grey"
                    style={{
                      fontSize: "0.75rem",
                    }}
                  >
                    {notification.notification_created_at
                      ? formatDateWithoutYear(notification.notification_created_at)
                      : "Just now"}
                  </span>
                </div>
              </div>

              {/* Delete Button */}
              <button
                className="btn btn-sm btn-light-danger ms-2"
                onClick={() => singleDeleteNotification(notification.user_notification_id)}
                aria-label="Delete notification"
                style={{
                  borderRadius: "50%",
                  padding: "4px",
                  width: "20px",
                  height: "20px",
                }}
              >
                &times;
              </button>
            </div>
          ))
        )}

        {loadingMore && (
          <div className="text-center text-muted my-2">
            <i className="fas fa-spinner fa-spin fs-4"></i>
          </div>
        )}
      </div>

      <div className="d-flex justify-content-end justify-content-md-between align-items-center p-2">
        {!noMoreData && notifications.length > 0 && (
          <button
            className="btn btn-primary btn-sm fs-9 me-md-2"
            onClick={loadMore}
            disabled={loadingMore}
            style={{
              borderRadius: "0.375rem",
              padding: "4px 12px",
            }}
          >
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        )}
        <button
          className={`btn btn-danger btn-sm fs-9 ${
            !noMoreData && notifications.length > 0 ? "" : "ms-auto"
          }`}
          onClick={clearNotifications}
          disabled={loading || loadingMore || notifications.length === 0}
          style={{
            borderRadius: "0.375rem",
            padding: "4px 12px",
          }}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

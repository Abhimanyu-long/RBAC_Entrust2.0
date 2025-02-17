import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../context/AuthContext";

export function useNotifications() {
  const { getNotifications, deleteNotification, clearAllNotifications  } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 5;

  const [noMoreData, setNoMoreData] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0); // Total count of notifications

  const fetchNotifications = useCallback(
    async (isLoadMore = false) => {
      try {
        isLoadMore ? setLoadingMore(true) : setLoading(true);
        setError(null);

        // Fetch data from the backend
        const data = await getNotifications(limit, offset);

        if (!Array.isArray(data)) {
          setNoMoreData(true);
        } else {
          if (data.length < limit) {
            setNoMoreData(true);
          }

          // Update notifications
          setNotifications((prev) =>
            isLoadMore ? [...prev, ...data] : data
          );

          // Update total count (calculate based on loaded notifications)
          setTotalCount((prevCount) =>
            isLoadMore ? prevCount + data.length : data.length
          );
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load notifications. Please try again.");
        if (!isLoadMore) {
          setNotifications([]);
          setTotalCount(0); // Reset total count on error
        }
      } finally {
        isLoadMore ? setLoadingMore(false) : setLoading(false);
      }
    },
    [getNotifications, limit, offset]
  );

  // Fetch on component mount or offset change
  useEffect(() => {
    fetchNotifications(offset !== 0);
  }, [offset, fetchNotifications]);

  const loadMore = () => {
    if (!noMoreData && !loadingMore) {
      setOffset((prev) => prev + limit);
    }
  };

   // Handle Delete Notification
   const singleDeleteNotification = async (id) => {
    try {
      await deleteNotification(id); // Call backend to delete notification
      setNotifications((prev) =>
        prev.filter((notification) => notification.user_notification_id !== id)
      );
      setTotalCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error("Failed to delete notification:", error);
      setError("Failed to delete notification. Please try again.");
    }
  };

  // Handle Clear All Notifications
  const clearNotifications = async () => {
    try {
      await clearAllNotifications(); // Call backend to clear all notifications
      setNotifications([]);
      setOffset(0);
      setNoMoreData(false);
      setTotalCount(0);
    } catch (error) {
      console.error("Failed to clear notifications:", error);
      setError("Failed to clear notifications. Please try again.");
    }
  };

  return {
    notifications,
    loading,
    loadingMore,
    noMoreData,
    error,
    loadMore,
    setNotifications,
    setError,
    setNoMoreData,
    totalCount,
    singleDeleteNotification,
    clearNotifications,
  };
}

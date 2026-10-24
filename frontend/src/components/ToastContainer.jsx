import { useState, useEffect, useRef } from "react";

function ToastItem({ toast, onDismiss }) {
  const [isHiding, setIsHiding] = useState(false);
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;

  useEffect(() => {
    let removeTimer = null;
    const hideTimer = setTimeout(() => {
      setIsHiding(true);
      removeTimer = setTimeout(() => {
        onDismissRef.current(toast.id);
      }, 350);
    }, 3200);

    return () => {
      clearTimeout(hideTimer);
      if (removeTimer) clearTimeout(removeTimer);
    };
  }, [toast.id]);

  const handleManualClose = () => {
    setIsHiding(true);
    setTimeout(() => {
      onDismissRef.current(toast.id);
    }, 350);
  };

  const isDelete = toast.type === "delete" || toast.isError;
  const themeColor = isDelete ? "#f43f5e" : "#38bdf8";
  const borderColor = isDelete
    ? "rgba(244, 63, 94, 0.75)"
    : "rgba(56, 189, 248, 0.75)";
  const shadowGlow = isDelete
    ? "0 10px 28px rgba(0, 0, 0, 0.65), 0 0 16px rgba(244, 63, 94, 0.3)"
    : "0 10px 28px rgba(0, 0, 0, 0.65), 0 0 16px rgba(56, 189, 248, 0.25)";

  return (
    <div
      className={`toast-card ${isHiding ? "hiding" : "show"}`}
      style={{
        borderColor: borderColor,
        boxShadow: shadowGlow,
      }}
    >
      <div className="toast-header-row">
        <div className="toast-body">
          <span className="toast-icon-wrapper" style={{ color: themeColor }}>
            {isDelete ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            )}
          </span>
          <div className="toast-message">{toast.message}</div>
        </div>
        <button
          type="button"
          className="toast-close-btn"
          title="Tutup"
          onClick={handleManualClose}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div
        className="toast-progress-bar"
        style={{
          background: themeColor,
          width: isHiding ? 0 : undefined,
        }}
      ></div>
    </div>
  );
}

export default function ToastContainer({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <aside
      id="toast-container"
      className="toast-container"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </aside>
  );
}

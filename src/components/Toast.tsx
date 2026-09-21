import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className={`toast-container toast-${toast.type}`} role="alert">
      <div className="toast-icon">
        {toast.type === 'success' && <CheckCircle2 size={16} />}
        {toast.type === 'error' && <AlertCircle size={16} />}
        {toast.type === 'info' && <Info size={16} />}
      </div>
      <div className="toast-text">
        <span className="toast-title">{toast.title}</span>
        {toast.description && <span className="toast-desc">{toast.description}</span>}
      </div>
      <button
        type="button"
        className="toast-close"
        onClick={onClose}
        aria-label="Đóng"
      >
        <X size={14} />
      </button>
    </div>
  );
};

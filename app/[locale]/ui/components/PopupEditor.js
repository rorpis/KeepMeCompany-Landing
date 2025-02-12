import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function PopupEditor({ onClose, children }) {
  // Listen for the Escape key and call onClose when pressed.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    // Add the event listener in the capture phase to ensure it catches the event early.
    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [onClose]);

  // Render the popup and its overlay via a portal attached to document.body.
  return ReactDOM.createPortal(
    <>
      {/* Overlay covers the entire viewport */}
      <div
        className="fixed inset-0 z-40 bg-black opacity-50"
        onClick={onClose}
      ></div>
      {/* Popup container */}
      <div
        className="fixed z-50 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-lg"
        style={{ left: '50%', top: '50%' }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </>,
    document.body
  );
}

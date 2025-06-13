import React from 'react';
import { FaTimes, FaExclamationCircle } from 'react-icons/fa';

export default function CustomAlert({ message, type, onClose }) {
  if (!message) {
    return null; ge
  }

  const isError = type === 'error';
  const bgColor = isError ? 'bg-red-500' : 'bg-green-500';
  const icon = isError ? <FaExclamationCircle /> : null; // Add an icon for errors

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-center justify-between gap-4 p-4 rounded-lg shadow-lg text-white ${bgColor} transition-transform transform translate-x-0`}
      role="alert"
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{message}</span>
      </div>
      <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20">
        <FaTimes />
      </button>
    </div>
  );
}
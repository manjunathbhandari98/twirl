// components/ToggleButton.tsx
import React from "react";

type ToggleButtonProps = {
  enabled: boolean;
  onToggle: () => void;
  label?: string;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({ enabled, onToggle, label }) => {
  return (
    <div className="flex items-center gap-3">
      {label && (
        <span className="text-gray-800 dark:text-gray-200 text-sm font-medium">
          {label}
        </span>
      )}
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors 
          ${enabled ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${enabled ? "translate-x-6" : "translate-x-1"}`}
        />
      </button>
    </div>
  );
};

export default ToggleButton;

import React, { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";

interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password";
  clearable?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const variantClasses = {
  filled: "bg-gray-100 dark:bg-gray-800 border-transparent focus:ring-2",
  outlined: "bg-transparent border border-gray-300 dark:border-gray-600 focus:ring-2",
  ghost: "bg-transparent border-b border-gray-300 dark:border-gray-600 focus:ring-1 rounded-none",
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;
  const inputId = label ? label.replace(/\s+/g, "-").toLowerCase() : undefined;

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className={`mb-1 text-sm font-medium ${
            disabled ? "text-gray-400" : "text-gray-700 dark:text-gray-200"
          }`}
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          id={inputId}
          type={inputType}
          value={value ?? ""}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full rounded-xl focus:outline-none transition
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${invalid ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-500"}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            ${clearable || type === "password" ? "pr-8" : ""}
          `}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute ${clearable ? "right-8" : "right-2"} text-gray-500 hover:text-gray-700 dark:hover:text-gray-300`}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {clearable && value && (
          <button
            type="button"
            onClick={() =>
              onChange?.({
                target: { value: "" },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            className="absolute right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {helperText && !invalid && (
        <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {helperText}
        </span>
      )}
      {invalid && errorMessage && (
        <span className="mt-1 text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};

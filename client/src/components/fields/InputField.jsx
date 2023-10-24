// Custom components
import React from "react";
import { BiCheckCircle } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";

function InputField(props) {
  const {
    label,
    id,
    extra,
    type,
    placeholder,
    variant,
    state,
    disabled,
    onChange,
    onBlur,
    value,
    min,
    step,
    name,
    inputClass,
  } = props;

  return (
    <div
      className={`border border-solid border-[#d7d7d7] bg-[#fafafa] flex flex-col justify-center h-9 shrink-0 items-start ${extra}`}>
      {label && (
        <label
          htmlFor={id}
          className={`text-sm text-navy-700 dark:text-white ${
            variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
          }`}>
          {label}
        </label>
      )}
      <div className="flex w-full items-center">
        <input
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          disabled={disabled}
          type={type}
          id={id}
          min={min}
          step={step}
          placeholder={placeholder}
          className={`flex-1 text-xs flex h-5 w-full items-center justify-center bg-white/0 p-3 outline-none ${inputClass} ${
            disabled === true
              ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
              : state === "error"
              ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
              : state === "success"
              ? ""
              : "border-gray-200 dark:!border-white/10 dark:text-white"
          }`}
        />
        <span className="flex justify-end mr-2">
          {state === "success" && value != "" && (
            <BiCheckCircle className="text-green-500" />
          )}
          {state === "error" && (
            <IoIosCloseCircleOutline className="text-red-500" />
          )}
        </span>
      </div>
    </div>
  );
}

export default InputField;

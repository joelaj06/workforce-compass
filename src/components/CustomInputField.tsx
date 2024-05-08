import { Box } from "@mui/material";
import { cn } from "../utils";
import { VariantProps, cva } from "class-variance-authority";
import { InputHTMLAttributes, ReactNode } from "react";
import { ErrorMessage } from "@hookform/error-message";
import {
  DeepMap,
  FieldError,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { FormErrorMessage } from "./FormErrorMessage";
import classNames from "classnames";

const inputVariance = cva(
  [
    "dark:bg-transparent",
    "rounded-lg",
    "outline-none",
    "text-gray-500",
    "w-full",
    // "border",
    // "border-gray-300",
  ],
  {
    variants: {
      intent: {
        primary: ["p-1", "h-10", "bg-red"],
      },
      variantSize: {
        small: ["text-xs", "h-8", "py-1", "px-2"],
        medium: ["text-base", "py-1", "px-2"],
      },
    },
    defaultVariants: {
      intent: "primary",
      variantSize: "small",
    },
  }
);

interface CustomInputFiledProps<T extends Record<string, unknown>>
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariance> {
  width?: string;
  suffixIcon?: ReactNode;
  prefixIcon?: ReactNode;
  backgroundColor?: string;
  label?: string;
  customClass?: string;
  register?: UseFormRegister<T>;
  name?: Path<T>;
  rules?: RegisterOptions;
  errors?: Partial<DeepMap<T, FieldError>>;
}

const CustomInputField = <T extends Record<string, unknown>>({
  customClass,
  variantSize,
  intent,
  width,
  prefixIcon,
  suffixIcon,
  backgroundColor,
  label,
  className,
  register,
  name,
  rules,
  errors,
  ...props
}: CustomInputFiledProps<T>) => {
  const hasError = errors && (name! in errors! ? true : false);

  return (
    <div className={customClass}>
      <label htmlFor={label} className="text-sm py-1">
        {label}
      </label>
      <Box
        sx={{
          width: width,
          display: "flex",
          justifyContent: "space-between",
          border: "1px solid #e9e9e9",
          borderColor: classNames({ red: hasError }),
          alignItems: "center",
          borderRadius: "8px",
          backgroundColor: backgroundColor,
        }}
      >
        {prefixIcon && prefixIcon}
        <input
          className={classNames(
            cn(inputVariance({ intent, variantSize, className })),
            {
              "transition-colors  focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600":
                hasError!,
            }
          )}
          {...props}
          {...(register && register(name!, rules))}
        ></input>
        {suffixIcon && suffixIcon}
      </Box>
      {hasError && (
        <ErrorMessage
          errors={errors}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          name={name as any}
          render={({ message }) => (
            <FormErrorMessage className="mt-1">{message}</FormErrorMessage>
          )}
        />
      )}
    </div>
  );
};

export default CustomInputField;

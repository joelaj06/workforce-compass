import { Box } from "@mui/material";
import { cn } from "../utils";
import { VariantProps, cva } from "class-variance-authority";
import { FC, InputHTMLAttributes, ReactNode } from "react";

const inputVariance = cva(
  [
    "dark:bg-transparent",
    "rounded-lg",
    "outline-none",
    "text-gray-500",
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
      variantSize: "medium",
    },
  }
);

interface CustomInputFiledProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariance> {
  width?: string;
  suffixIcon?: ReactNode;
  prefixIcon?: ReactNode;
  backgroundColor?: string;
}

const CustomInputField: FC<CustomInputFiledProps> = ({
  className,
  variantSize,
  intent,
  width,
  prefixIcon,
  suffixIcon,
  backgroundColor,
  ...props
}) => {
  return (
    <Box
      sx={{
        width: width,
        display: "flex",
        justifyContent: "space-between",
        border: "1px solid #e9e9e9",
        alignItems: "center",
        borderRadius: "8px",
        backgroundColor: backgroundColor,
      }}
    >
      {prefixIcon && prefixIcon}
      <input
        className={cn(inputVariance({ intent, variantSize, className }))}
        {...props}
      ></input>
      {suffixIcon && suffixIcon}
    </Box>
  );
};

export default CustomInputField;

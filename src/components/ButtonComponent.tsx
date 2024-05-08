import { Button } from "@mui/material";
import { useState } from "react";

type CustomButtonProps = {
  sx?: React.CSSProperties;
  children: React.ReactNode;
  iconOnLeft?: React.ReactNode;
  iconOnRight?: React.ReactNode;
  bgColor?: "primary" | "secondary" | "tertiary" | string;
  hoverBgColor?: "primary" | "secondary" | "tertiary" | string;
  hoverBorderColor?: "primary" | "secondary" | "tertiary" | string;
  hoverTextColor?: "primary" | "secondary" | "tertiary" | string;
  textColor?: "primary" | "secondary" | "tertiary" | string;
  textSize?: string;
  textTransform?: "capitalize" | "uppercase" | "lowercase";
  borderColor?: "primary" | "secondary" | "tertiary" | string;
  borderWidth?: string;
  onClick?: (functionToExecute: unknown) => void;
  btnWidth?: "small" | "medium" | "fullWidth" | string;
  btnHeight?: "small" | "medium" | "fullWidth" | string;
  variantType?: "outlined" | "filled" | "textOnly";
  type?: "submit" | "reset" | "button";
  disabled?: boolean;

  disableOnClick?: boolean;
  className?: string;
  borderRadius?: string;
  onKeyDown?: (fnc: unknown) => void;
};

const ButtonComponent = ({
  sx,
  bgColor,
  textColor,
  hoverBorderColor,
  hoverTextColor,
  borderColor,
  disableOnClick,
  borderWidth,
  iconOnRight,
  hoverBgColor,
  btnHeight,
  textTransform,
  onClick,
  variantType,
  onKeyDown,
  textSize,
  btnWidth,
  iconOnLeft,
  disabled,
  className,
  children,
  borderRadius,
  type,
}: CustomButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const buttonColor =
    bgColor === "primary" ? "#0a8686" : bgColor ? bgColor : "none";

  const hoverBgColors = hoverBgColor || "#086d6d";

  const hoverBorderColors =
    hoverBorderColor === "primary"
      ? "var(--primary-color)"
      : hoverBorderColor === "secondary"
      ? "var(--secondary-color)"
      : hoverBorderColor === "tertiary"
      ? "var(--tertiary-color)"
      : hoverBorderColor;

  const hoverTextColors =
    hoverTextColor === "primary"
      ? "#0a8686"
      : hoverTextColor
      ? hoverTextColor
      : "none";

  const btnTextColor =
    textColor === "primary"
      ? "var(--color-primary)"
      : textColor === "secondary"
      ? "var(--color-secondary)"
      : textColor === "tertiary"
      ? "var(--color-tertiary)"
      : textColor;

  const btnBorderColor =
    borderColor === "primary"
      ? "var(--color-primary)"
      : borderColor === "secondary"
      ? "var(--color-secondary)"
      : borderColor === "tertiary"
      ? "var(--color-tertiary)"
      : borderColor;

  const btnWidths =
    btnWidth === "small"
      ? "50px"
      : btnWidth === "medium"
      ? "200px"
      : btnWidth === "fullWidth"
      ? "100%"
      : btnWidth;

  const btnHeights =
    btnHeight === "small"
      ? "30px"
      : btnHeight === "medium"
      ? "40px"
      : btnHeight === "large"
      ? "70px"
      : btnHeight || "50px";

  const variant =
    variantType === "outlined"
      ? "outlined"
      : variantType === "filled"
      ? "contained"
      : variantType === "textOnly"
      ? "text"
      : "outlined";

  const handleClick = () => {
    if (disableOnClick) {
      setIsClicked(true);
    }

    if (onClick) {
      onClick(onClick);
    }
  };

  const isDisabled = disabled || isClicked;
  return (
    <>
      <Button
        onKeyDown={onKeyDown}
        type={type}
        sx={{
          backgroundColor: disabled ? "var(--color-tertiary)" : buttonColor,
          color: btnTextColor,
          fontFamily: "'Poppins', sans-serif",
          textTransform: textTransform,
          fontSize: textSize ?? "10px",
          borderRadius: borderRadius,
          borderWidth: borderWidth,
          p: "10px",
          borderColor: btnBorderColor,
          minWidth: "200px",
          width: btnWidths,
          height: btnHeights,
          ":hover": {
            backgroundColor: hoverBgColors,
            color: hoverTextColors,
            borderColor: hoverBorderColors,
            borderWidth: "1px",
          },
        }}
        style={sx}
        startIcon={iconOnLeft}
        endIcon={iconOnRight}
        variant={"contained" || variant}
        onClick={handleClick}
        disabled={isDisabled}
        className={className}
      >
        {children}
      </Button>
    </>
  );
};

export default ButtonComponent;

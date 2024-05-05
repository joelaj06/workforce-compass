import Select, { SingleValue } from "react-select";

interface DropDownComponentProps {
  label: string;
  options: DropDownOption[];
  onChanged: (value: SingleValue<DropDownOption>) => void;
  width?: string;
}

interface DropDownOption {
  value: string;
  label: string;
}

const DropDownComponent = ({
  label,
  options,
  onChanged,
  width,
}: DropDownComponentProps) => {
  return (
    <Select
      onChange={(val) => onChanged(val)}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: "#ffe8cc",
          primary: "#ff8c00",
        },
      })}
      styles={{
        option: (base) => ({
          ...base,
          cursor: "pointer",
          fontSize: "12px",

          "&:active": {
            backgroundColor: "#ff8c00",
          },
        }),
        control: (baseStyles) => ({
          ...baseStyles,
          borderRadius: "10px",
          borderColor: "var(--color-primary)",
          fontSize: "12px",
          color: "var(--color-primary)",
          backgroundColor: "var(--color-primary-shade3)",
          width: width ?? "100%",
        }),
      }}
      options={options}
      placeholder={label}
    />
  );
};

export default DropDownComponent;

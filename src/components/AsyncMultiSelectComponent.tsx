import AsyncSelect from "react-select/async";
import { DropDownOption } from "./DropDownComponent";
import { MultiValue } from "react-select";

interface AsyncMultiSelectorComponentProps {
  label: string;
  options: (val: string) => Promise<DropDownOption[]>;
  onChanged: (value: MultiValue<DropDownOption>) => void;
  width?: string;
}

const AsyncMultiSelectorComponent = ({
  label,
  options,
  onChanged,
  width,
}: AsyncMultiSelectorComponentProps) => {
  return (
    <AsyncSelect
      isMulti
      cacheOptions
      // defaultOptions
      loadOptions={options}
      onChange={(val) => onChanged(val)}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: "#adadaa",
          primary: "#444444",
        },
      })}
      styles={{
        option: (base) => ({
          ...base,
          cursor: "pointer",
          fontSize: "12px",

          "&:active": {
            backgroundColor: "#0a8686",
          },
        }),

        menu: (base) => ({
          ...base,
          backgroundColor: "white",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          borderRadius: "5px",
        }),
        container: (base) => ({
          ...base,
          fontSize: "10px",
        }),
        placeholder: (base) => ({
          ...base,
          fontSize: "12px",
        }),
        singleValue: (base) => ({
          ...base,
          fontSize: "12px",
        }),
        control: (baseStyles) => ({
          ...baseStyles,
          borderRadius: "10px",
          borderColor: "var(--color-primary)",
          fontSize: "10px",
          color: "var(--color-primary)",
          backgroundColor: "var(--color-primary-shade3)",
          width: width ?? "100%",
          height: "20px",
        }),
      }}
      placeholder={label}
    />
  );
};

export default AsyncMultiSelectorComponent;

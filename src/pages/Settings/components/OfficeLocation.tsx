import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { ButtonComponent, CustomInputField } from "../../../components";
import { Radius, locationRadiusLimit } from "../common/settings";

const OfficeLocation = () => {
  const radi = useMemo(() => locationRadiusLimit, []);
  const [selectedRadius, setSelectedRadius] = useState<Radius>({
    label: "",
    radius: 0,
    id: 0,
  });
  const [officeAddress, setOfficeAddress] = useState<string>("");
  // const [position, setPosition] = useState<number[]>([51.505, -0.09]);

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOfficeAddress(e.target.value);
    // Logic to convert address to coordinates (geocoding) would go here
    // For simplicity, we're just updating the address state
  };
  useEffect(() => {
    // Here you can add logic to update the map based on officeAddress
    // This might involve calling a geocoding API to get the coordinates for the entered address
    // and then updating the position state
  }, [officeAddress]);
  return (
    <div className="bg-white rounded-sm shadow-sm px-3 py-4">
      <div>
        <p className="font-bold text-lg">Office Location</p>
        <CustomInputField
          width="40%"
          name="address"
          customClass="flex-1"
          type="text"
          placeholder="⚲ Street, city, country"
          label="Office Location"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleAddressChange(e)
          }
        />

        <div>
          <p className="text-sm my-3"> Check In Limit (Radius)</p>
          <div className="flex flex-row gap-2">
            {radi.map((radius) => (
              <div
                onClick={() => setSelectedRadius(radius)}
                className={`p-2  cursor-pointer rounded-md shadow-sm text-sm ${
                  radius === selectedRadius
                    ? "bg-primary-color text-white"
                    : "bg-gray-200"
                }`}
              >
                {radius.label}
              </div>
            ))}
          </div>
        </div>

        <div className="h-60"></div>

        <div className="flex flex-row justify-end">
          <ButtonComponent
            btnHeight="small"
            minWidth="fit-content"
            btnWidth="105px"
            variantType="outlined"
            disabled={officeAddress == ""}
            onClick={() => {}}
          >
            <span className="capitalize text-xs">Save</span>
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default OfficeLocation;

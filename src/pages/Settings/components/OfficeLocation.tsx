import { ChangeEvent, useMemo, useState } from "react";
import { ButtonComponent, CustomInputField } from "../../../components";
import {
  ILocation,
  IOrganization,
  IOrganizationRequestPayload,
  Radius,
  locationRadiusLimit,
} from "../common/settings";
import { useUpdateOrganizationMutation } from "../common/settings-api";
import MapLocation from "../../../components/MapLocation";
import { showToast } from "../../../utils/ui/notifications";
import { IErrorData } from "../../../components/login/common/auth";

interface OfficeLocationProps {
  data: IOrganization | null;
}
const OfficeLocation = ({ data }: OfficeLocationProps) => {
  const [updateOrganization, { isLoading }] = useUpdateOrganizationMutation();

  const radi = useMemo(() => locationRadiusLimit, []);
  const [selectedRadius, setSelectedRadius] = useState<Radius>(
    data?.radius ?? radi[0]
  );
  const [officeLocation, setOfficeLocation] = useState<ILocation>(
    data?.location ?? {
      long: 0,
      lat: 0,
      address: "",
    }
  );
  const [officeAddress, setOfficeAddress] = useState<string>(
    officeLocation?.address ?? ""
  );

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOfficeAddress(e.target.value);
  };

  const onMarkerClick = (location: ILocation) => {
    // Update the location and address based on the marker position
    setOfficeLocation(location);
    setOfficeAddress(location.address); // Update the address input field
  };

  const onOfficeUpdate = async () => {
    setOfficeLocation({ ...officeLocation, address: officeAddress });
    const payload: IOrganizationRequestPayload = {
      _id: data?._id ?? "",
      radius: selectedRadius,
      location: officeLocation,
    };

    try {
      const res = await updateOrganization(payload);
      if (res && res.data) {
        showToast({
          message: "Office location updated successfully",
          type: "success",
        });
      } else {
        const error = res.error as IErrorData;
        showToast({ message: error.data.message, type: "error" });
      }
    } catch (error) {
      console.error("Error updating organization:", error);
      showToast({ message: "Sorry an error occured", type: "error" });
    }
  };

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
          value={officeAddress}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleAddressChange(e)
          }
        />

        <div className="p-4">
          {/* Here you can render the map with the officeAddress and position state */}
          <MapLocation
            radius={data?.radius.radius}
            onMarkerClick={onMarkerClick}
          />
        </div>

        <div>
          <p className="text-sm my-3"> Check In Limit (Radius)</p>
          <div className="flex flex-row gap-2">
            {radi.map((radius, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedRadius(radius)}
                className={`p-2  cursor-pointer rounded-md shadow-sm text-sm ${
                  radius === selectedRadius ||
                  (data?.radius && radius.radius == data.radius.radius)
                    ? "bg-primary-color text-white"
                    : "bg-gray-200"
                }`}
              >
                {radius.label}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-row justify-end">
          <ButtonComponent
            btnHeight="small"
            minWidth="fit-content"
            btnWidth="105px"
            variantType="outlined"
            disabled={isLoading}
            onClick={() => {
              onOfficeUpdate();
            }}
          >
            <span className="capitalize text-xs">Save</span>
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default OfficeLocation;

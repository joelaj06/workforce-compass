import { Avatar } from "@mui/material";
import { useState, ChangeEvent } from "react";
import { CustomInputField, ButtonComponent } from "../../../components";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import ImageIcon from "@mui/icons-material/Image";
import { IOrganization, IOrganizationRequestPayload } from "../common/settings";
import { useUpdateOrganizationMutation } from "../common/settings-api";
import { showToast } from "../../../utils/ui/notifications";
import { IErrorData } from "../../../components/login/common/auth";

interface OfficeInfoProps {
  data: IOrganization;
}
const OfficeInfo = ({ data }: OfficeInfoProps) => {
  const [updateOrganization, { isLoading }] = useUpdateOrganizationMutation();

  const [selectedImage, setSelectedImage] = useState<string>(data.logo);
  const [officeName, setOfficeName] = useState<string>(data.name);
  const [note, setNote] = useState<string>(data.note ?? "");

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files as FileList;
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        setSelectedImage(reader.result as string);
      }
    };

    reader.readAsDataURL(file[0]);
  };

  const onOfficeUpdate = async () => {
    const payload: IOrganizationRequestPayload = {
      _id: data._id,
      name: officeName,
      logo: selectedImage,
      note: note,
    };

    try {
      const res = await updateOrganization(payload);
      if (res && res.data) {
        showToast({
          message: "Organization updated successfully",
          type: "success",
        });
      } else {
        const error = res.error as IErrorData;
        showToast({ message: error.data.message, type: "error" });
      }
    } catch (error) {
      console.error("Error updating organization:", error);
    }
  };

  return (
    <div className="bg-white rounded-sm shadow-sm px-3 py-4">
      <div>
        <p className="font-bold text-lg">Office Details</p>
        <div className="flex flex-row gap-3 p-3 items-center">
          <div className="flex flex-col gap-1 w-1/3">
            <CustomInputField
              name="office_name"
              customClass="flex-1"
              type="text"
              label="Office Name"
              defaultValue={data.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setOfficeName(e.target.value)
              }
            />
            <CustomInputField
              name="note"
              customClass="flex-1"
              type="text"
              multipleLines={true}
              defaultValue={data.note}
              label="Note"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNote(e.target.value)
              }
            />
          </div>

          {/* image upload  */}
          <div>
            <p className="text-sm">Company Logo</p>
            <div className="border border-dashed p-4 rounded-lg flex flex-col gap-2 justify-center items-center">
              {/* <img
                className="w-10 grayscale"
                src="/assets/images/office-building.png"
                alt="office building logo"
              /> */}
              <p className="text-sm">Upload Company Logo</p>
              <div className="mb-1  p-1 rounded-lg flex flex-col items-center">
                <div className="flex flex-col gap-1 items-center">
                  <Avatar
                    variant="rounded"
                    sx={{
                      width: "120px",
                      height: "120px",
                      borderColor: "var(--color-text-black)",
                    }}
                  >
                    {selectedImage ? (
                      <Avatar
                        variant="rounded"
                        src={selectedImage}
                        sx={{
                          width: "130px",
                          height: "130px",
                          color: "gray",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <Avatar
                        variant="rounded"
                        sx={{
                          width: "130px",
                          height: "130px",
                          color: "gray",
                          borderColor: "var(--color-text-black)",
                        }}
                      >
                        <ImageIcon sx={{ width: "100px", height: "100px" }} />
                      </Avatar>
                    )}
                  </Avatar>
                  <div className="bg-white rounded-full w-10 h-10 p-1  shadow-md flex flex-col justify-center items-center">
                    <label htmlFor="fileInput">
                      <AddAPhotoIcon
                        sx={{ fontSize: "16px", color: "var(--color-primary)" }}
                        className="text-gray-600 cursor-pointer"
                      />
                    </label>
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end">
          <ButtonComponent
            btnHeight="small"
            minWidth="fit-content"
            btnWidth="105px"
            variantType="outlined"
            disabled={officeName == "" || isLoading}
            onClick={() => onOfficeUpdate()}
          >
            <span className="capitalize text-xs">Save</span>
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default OfficeInfo;

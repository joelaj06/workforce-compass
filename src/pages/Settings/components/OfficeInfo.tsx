import { Avatar } from "@mui/material";
import { useState, ChangeEvent } from "react";
import { CustomInputField, ButtonComponent } from "../../../components";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import ImageIcon from "@mui/icons-material/Image";

const OfficeInfo = () => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [officeName, setOfficeName] = useState<string>("");

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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setOfficeName(e.target.value)
              }
            />
            <CustomInputField
              name="website_url"
              customClass="flex-1"
              type="text"
              label="Website URL"
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
            disabled={officeName == ""}
            onClick={() => {}}
          >
            <span className="capitalize text-xs">Save</span>
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default OfficeInfo;

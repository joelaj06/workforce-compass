import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IOrganization, ISettings } from "./settings";

const initialState: ISettings = {
  organization: {
    _id: "",
    name: "",
    description: "",
    code: "",
    arrival_time: "",
    departure_time: "",
    motto: "",
    radius: { id: 0, radius: 0, label: "" }, // Assuming radius has a value and unit
    location: {
      lat: 0,
      long: 0,
      address: "",
    },
    logo: "",
    note: "",
    address: "",
  },
};

// Reducer functions
const saveOrganization = (
  state: ISettings,
  action: PayloadAction<IOrganization>
) => {
  state.organization = action.payload;
};

export const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setOrganization: saveOrganization,
  },
});

export const organizationReducer = organizationSlice.reducer;
export const { setOrganization } = organizationSlice.actions;

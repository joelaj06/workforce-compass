import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ILoggedInUser, IUser } from "./employee";

const initialState: ILoggedInUser = {
  user: {
    id: "",
    first_name: "",
    last_name: "",
    image: "",
    role: "",
    status: "",
    job_title: "",
    phone: "",
    location: "",
    email: "",
    address: "",
    token: "",
  },
};

//reducer functions
const saveActiveUser = (state: ILoggedInUser, action: PayloadAction<IUser>) => {
  state.user = action.payload;
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser: saveActiveUser,
  },
});

export const userReducer = userSlice.reducer;
export const { setActiveUser } = userSlice.actions;

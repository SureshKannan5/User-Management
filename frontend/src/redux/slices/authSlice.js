import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  access: [],
  role: "",
  id: "",
  userName: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: userInitialState,

    token: "",
  },
  reducers: {
    setUserAuthToken: (state, action) => {
      const { token } = action.payload;

      state.token = token;
    },
    setUserInfo: {
      reducer: (state, action) => {
        state.userInfo = action.payload;
      },
      prepare(filterData, changedData) {
        return {
          payload: { ...filterData, ...changedData },
        };
      },
    },
    logOut: (state) => {
      sessionStorage.removeItem("auth-token");
      sessionStorage.removeItem("currentUserRole");
      state.token = "";
      state.userInfo = userInitialState;
    },
  },
});

export const { setUserInfo, logOut, setUserAuthToken } = authSlice.actions;

export const selectCurrentToken = (state) => state.auth.token;

export const getCurrentSessionUserInfo = (state) => state.auth.userInfo;
export default authSlice.reducer;

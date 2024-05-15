import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "settings",
  initialState: {
    settings: {
      logoBackground: true,
      theme: {
        primary: "#89043d",
        secondary: "#FFCA55",
      },
    },
  },
  reducers: {
    updateSettings(state, action) {
      state.settings = action.payload;
    },
  },
});

//user actions
export const updateSettings = (newSettings) => async (dispatch) => {
  dispatch(slice.actions.updateSettings(newSettings));
};

export const { reducer } = slice;

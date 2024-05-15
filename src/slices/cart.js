import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    discount: 0
  },
  reducers: {
    addToCart(state, action) {
      state.items = [...state.items, action.payload];
    },

    addDiscount(state, action) {
      state.discount = action.payload
    },

    removeFromCart(state, action) {
      const updatedCart = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      state.items = [...updatedCart];
    },

    clearCart(state, action) {
      state.items = [];
    },

    addQuantity(state, action) {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      state.items[itemIndex].quantity = state.items[itemIndex].quantity + 1;
    },

    subtractQuantity(state, action) {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      state.items[itemIndex].quantity = state.items[itemIndex].quantity > 1 ? state.items[itemIndex].quantity - 1 : 1;
    },
  },
});

//user actions

// export const fetchJoinedProjects = (userId) => async (dispatch) => {
//     const data = await projectsApi.getJoinedProjects(userId)
//     dispatch(slice.actions.fetchJoinedProjects(data));
// };

export const addToCart = (item) => async (dispatch) => {
  dispatch(slice.actions.addToCart(item));
};

export const removeFromCart = (item) => async (dispatch) => {
  dispatch(slice.actions.removeFromCart(item));
};

export const addQuantity = (item) => async (dispatch) => {
  dispatch(slice.actions.addQuantity(item));
};

export const addDiscount = (discount) => async (dispatch) => {
  dispatch(slice.actions.addDiscount(discount));
};

export const subtractQuantity = (item) => async (dispatch) => {
  dispatch(slice.actions.subtractQuantity(item));
};

export const clearCart = () => async (dispatch) => {
  dispatch(slice.actions.clearCart());
};

export const { reducer } = slice;

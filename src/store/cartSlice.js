import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addCart: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (!existingItem) {
        const newItem = {
          ...action.payload,
          count: 1,
        };

        state.push(newItem);
      }
    },
    deleteCart: (state, action) => {
      const id = action.payload;
      return state.filter((item) => item.id !== id);
    },
    resetCart: () => {
      console.log('resetCart');
      return [];
    },
    countUp: (state, action) => {
      const id = action.payload;
      state.forEach((item) => {
        if (item.id === id) {
          item.count++;
        }
      });
    },
    countDown: (state, action) => {
      const id = action.payload;
      state.forEach((item) => {
        if (item.id === id) {
          item.count--;
        }
      });
    },
  },
});

export const { addCart, deleteCart, countUp, countDown, resetCart } =
  cartSlice.actions;

export default cartSlice;

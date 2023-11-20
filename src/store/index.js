import { configureStore } from '@reduxjs/toolkit';
import user from './userSlice.js';
import cart from './cartSlice.js';

export const store = configureStore({
  reducer: {
    userdata: user.reducer,
    cart: cart.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

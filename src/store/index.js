import { configureStore } from '@reduxjs/toolkit';
import user from './userSlice.js';

export const store = configureStore({
  reducer: {
    userdata: user.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

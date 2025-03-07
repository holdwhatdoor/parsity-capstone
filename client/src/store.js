import { configureStore } from '@reduxjs/toolkit';

// configured Store variable to handle state of store for App
export const store = configureStore({
  reducer: { },
  initialState: [
    { queryResultsData: {} },
  ],
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }) 
});

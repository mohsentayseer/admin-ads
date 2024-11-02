import { configureStore } from '@reduxjs/toolkit';
import adsReducer from '../features/adsSlice';

// Configure the Redux store
const store = configureStore({
  reducer: {
    ads: adsReducer, // Register the ads reducer
  },
});

// Export the configured store
export default store;

import { configureStore } from '@reduxjs/toolkit';
import adsReducer from '../features/adsSlice';

const store = configureStore({
  reducer: {
    ads: adsReducer,
  },
});

export default store;

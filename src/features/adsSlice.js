import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAds = createAsyncThunk(
    'ads/fetchAds',
    async () => {
      const response = await fetch('https://ads-back.shutterstudio.io/ads');
      const data = await response.json();
      return data.data.result;
    }
  );

  const adsSlice = createSlice({
    name: 'ads',
    initialState: {
      adsList: [],
      status: 'idle',
      error: null,
    },
    reducers: {
      addAd: (state, action) => {
        state.adsList.push(action.payload);
      },
      updateAd: (state, action) => {
        const index = state.adsList.findIndex(ad => ad.id === action.payload.id);
        if (index !== -1) {
          state.adsList[index] = action.payload;
        }
      },
      deleteAd: (state, action) => {
        state.adsList = state.adsList.filter(ad => ad.id !== action.payload);
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAds.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchAds.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.adsList = action.payload;
        })
        .addCase(fetchAds.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });


export const { setAds, addAd, updateAd, deleteAd } = adsSlice.actions;

export default adsSlice.reducer;

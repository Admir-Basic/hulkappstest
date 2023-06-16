import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    netInfoStatus: true,
    offlineMode: false
};

export const netInfoSlice = createSlice({
    name: 'netInfo',
    initialState,
    reducers: {
        setNetInfo: (state, action) => {
            const { payload } = action
            state.netInfoStatus = payload;
        },
        setOfflineMode: (state, action) => {
            const { payload } = action
            state.offlineMode = payload;
        },
    },
});

export const { setNetInfo, setOfflineMode } = netInfoSlice.actions;

export const selectNetInfo = (state) => state.netInfo.netInfoStatus;
export const selectOfflineMode = (state) => state.netInfo.offlineMode;

export default netInfoSlice.reducer;
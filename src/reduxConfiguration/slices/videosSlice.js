import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    videosProgress: {},
};

export const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        setVideoProgress: (state, action) => {
            const { payload } = action

            if (payload?.id && payload.time >= 0) {
                let newVideos = state?.videosProgress ? { ...state.videosProgress } : {}
                newVideos[payload.id] = payload.time

                state.videosProgress = newVideos
            }

        },
    },
});

export const { setVideoProgress } = videosSlice.actions;

export const selectVideosProgress = (state) => state.videos.videosProgress;

export default videosSlice.reducer;
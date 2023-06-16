import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'reduxjs-toolkit-persist'

import netInfoReducer from './slices/netInfoSlice'
import videosReducer from './slices/videosSlice'

import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
}

const netInfoPersistConfig = {
    key: 'netInfo',
    version: 1,
    storage: AsyncStorage,
}

const videosPersistConfig = {
    key: 'videos',
    version: 1,
    storage: AsyncStorage,
}



const rootReducer = combineReducers({
    netInfo: persistReducer(netInfoPersistConfig, netInfoReducer),
    videos: persistReducer(videosPersistConfig, videosReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    })
});
const persistor = persistStore(store)

export { store, persistor };

import React from 'react';
// import positionReducer from "./ReducerRedux"
import { persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
    } from 'redux-persist';
import {configureStore} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {orderReductor} from "./ReducerRedux"


// localStorage.setItem("arrayWithElements", JSON.stringify(arrayWithElements));

const persistConfig = {
    key: 'arrayWithElements',
    storage,
}

const persistedReducer = persistReducer(persistConfig, orderReductor);


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persister = persistStore(store);
export default store;

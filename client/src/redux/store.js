import { configureStore, combineReducers } from "@reduxjs/toolkit"
import userReducer from './userSlice'
import postReducer from './postSlice'
import { persistStore,persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from 'redux-persist'
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    // migrate: async (state) => {
    //     if (state && state._persist && state._persist.version !== persistConfig.version) {
    //         persistor.purge();
    //         return {};
    //     }
    //     return state;
    // },
}

const rootReducer = combineReducers({ user: userReducer, postx: postReducer })

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)

// import { configureStore, combineReducers } from "@reduxjs/toolkit"
// import userReducer from './userSlice'
// import postReducer from './postSlice'
// import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage,
//     migrate: async (state) => {
//         if (state && state._persist && state._persist.version !== persistConfig.version) {
//             persistor.purge();
//             return {};
//         }
//         return state;
//     },
// };

// const rootReducer = combineReducers({ user: userReducer, postx: postReducer })

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// export const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//             },
//         }),
// })

// export const persistor = persistStore(store);

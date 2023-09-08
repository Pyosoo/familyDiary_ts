import { configureStore, combineReducers, Store, Action } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { persistReducer, persistStore, Persistor } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { userReducer } from "./reducer/user/user";
import { settingReducer } from "./reducer/setting/setting";

const rootReducer = combineReducers({
    user: userReducer,
    setting: settingReducer
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export interface ExtendedStore extends Store {
    __persistor: Persistor;
}

export const makeStore = (): ExtendedStore => {
    const store = configureStore({
        reducer: (state, action) => {
            switch (action.type) {
                case HYDRATE:
                    return action.payload;
                default:
                    return persistedReducer(state, action);
            }
        },
        devTools: process.env.NODE_ENV !== "production",
    }) as ExtendedStore;

    store.__persistor = persistStore(store); // Persistor 생성

    return store;
};

const wrapper = createWrapper<ExtendedStore>(makeStore, {
    debug: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof rootReducer>;
export default wrapper;

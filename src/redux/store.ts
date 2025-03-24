import { configureStore, Reducer, UnknownAction } from "@reduxjs/toolkit";
import {
  persistStore, persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from "./RootReducer";
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { TThemeState } from "./slices/themeSlice";

const persistConfig = {
  key: 'root-redux',
  storage: storage,
  transforms: [
    encryptTransform({
      secretKey: "encrypt-secret-key-for-redux-persist",
      onError: function (error) {
        console.log(error)
      },
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer as Reducer<Partial<{
  theme: TThemeState
}>, UnknownAction>);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };


export type AppDispatch = typeof store.dispatch;
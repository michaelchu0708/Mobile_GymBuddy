import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
// import { AsyncStorage } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
// import storage from 'redux-persist/lib/storage';
import { reducer as rootReducer } from "./reducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default (enhancer) => {
  const store = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store);
  return { store, persistor };
};

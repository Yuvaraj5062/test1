
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
//import {reduxBatch} from "@manaflair/redux-batch";
 import {persistStore} from "redux-persist";
import {rootReducer} from "./rootReducer";
import { rootSaga } from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
   // thunk: true
  }),
  sagaMiddleware
];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools:true

  // need to set developement tools
  //devTools: process.env.NODE_ENV !== "production", 
 // enhancers: [reduxBatch] 
});


 export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
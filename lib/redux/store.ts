import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme/themeSlice";
import settingsReducer from "./features/settings/settingsSlice";
import countersReducer from "./features/counters/countersSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      theme: themeReducer,
      settings: settingsReducer,
      counters: countersReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

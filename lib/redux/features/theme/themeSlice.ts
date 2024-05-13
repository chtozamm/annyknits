import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/redux/store";

// Define a type for the slice state
interface ThemeState {
  value: string;
}

// Define the initial state using that type
const initialState: ThemeState = {
  value: "",
};

export const themeSlice = createSlice({
  name: "theme",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setThemeState: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setThemeState } = themeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTheme = (state: RootState) => state.theme.value;

export default themeSlice.reducer;

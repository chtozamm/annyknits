import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/redux/store";

// Define a type for the slice state
interface SplitState {
  isSplit: boolean;
}

// Define the initial state using that type
const initialState: SplitState = {
  isSplit: false,
};

export const splitSlice = createSlice({
  name: "split",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setIsSplit: (state, action: PayloadAction<boolean>) => {
      state.isSplit = action.payload;
    },
  },
});

export const { setIsSplit } = splitSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsSplit = (state: RootState) => state.split.isSplit;

export default splitSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/redux/store";

// Define a type for the slice state
interface SettingsState {
  // showLabel: boolean | null;
  sfx: boolean | null;
  volume: number | null;
}

// Define the initial state using that type
const initialState: SettingsState = {
  // showLabel: null,
  sfx: null,
  volume: null,
};

export const settingsSlice = createSlice({
  name: "settings",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    // setShowLabelState: (state, action: PayloadAction<boolean>) => {
    // state.showLabel = action.payload;
    // },
    setSfxState: (state, action: PayloadAction<boolean>) => {
      state.sfx = action.payload;
    },
    setVolumeState: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
  },
});

export const { setSfxState, setVolumeState } = settingsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectShowLabel = (state: RootState) => state.settings.showLabel;
export const selectSfx = (state: RootState) => state.settings.sfx;
export const selectVolume = (state: RootState) => state.settings.volume;

export default settingsSlice.reducer;

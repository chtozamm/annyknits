import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/redux/store";

type Counter = {
  value: number;
  name: string;
  theme: string;
  icon: string;
};

// Define a type for the slice state
interface CounterState {
  counters: Counter[];
  current: number | null;
}

// Define the initial state using that type
const initialState: CounterState = {
  counters: [],
  current: null,
};

export const countersSlice = createSlice({
  name: "counters",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setCounterState: (
      state,
      // action: PayloadAction<{ counter: Counter; id: string }>,
      action: PayloadAction<Counter[]>,
    ) => {
      state.counters = action.payload;
    },
    setCurrentCounter: (state, action: PayloadAction<number>) => {
      state.current = action.payload;
    },
    addCounter: (state, action: PayloadAction<Counter>) => {
      state.counters.push(action.payload);
    },
    updateCounter: (
      state,
      action: PayloadAction<{ counter: Counter; id: number }>,
    ) => {
      state.counters[action.payload.id] = action.payload.counter;
    },
    deleteCounter: (state, action: PayloadAction<number>) => {
      if (state.current !== 0 && state.current! >= action.payload) {
        state.current! -= 1;
      }
      state.counters = state.counters.toSpliced(action.payload, 1);
    },
    increaseCounter: (state, action: PayloadAction<number>) => {
      state.counters[action.payload].value += 1;
    },
    decreaseCounter: (state, action: PayloadAction<number>) => {
      state.counters[action.payload].value -= 1;
    },
    resetCounter: (state, action: PayloadAction<number>) => {
      state.counters[action.payload].value = 0;
    },
  },
});

export const {
  setCounterState,
  setCurrentCounter,
  addCounter,
  updateCounter,
  deleteCounter,
  increaseCounter,
  decreaseCounter,
  resetCounter,
} = countersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCounters = (state: RootState) => state.counters.counters;
export const selectCurrentCounter = (state: RootState) =>
  state.counters.current;

export default countersSlice.reducer;

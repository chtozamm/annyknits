import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/redux/store";

type Counter = {
  value: number;
  name: string;
  theme: string;
  icon: string;
  goal: number | null;
  created_at: Date;
};

type Counters = { [id: number]: Counter };

// Define a type for the slice state
interface CounterState {
  counters: Counters;
  current: number;
  amount: number;
  next: number[];
}

// Define the initial state using that type
const initialState: CounterState = {
  counters: {},
  current: 0,
  amount: 0,
  next: [],
};

export const counterSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setCounters: (state, action: PayloadAction<Counters>) => {
      state.counters = action.payload;
    },
    setCurrentCounter: (state, action: PayloadAction<number>) => {
      state.current = action.payload;
    },
    addCounter: (state, action: PayloadAction<Counter>) => {
      if (state.next.length > 0) {
        state.counters[state.next[state.next.length - 1]] = action.payload;
        state.next.pop();
      } else {
        state.counters[state.amount] = action.payload;
      }
      state.amount++;
      state.current;
    },
    // updateCounter: (
    //   state,
    //   action: PayloadAction<{ counter: Counter; id: number }>,
    // ) => {
    //   state.counters[action.payload.id] = action.payload.counter;
    // },
    updateValue: (
      state,
      action: PayloadAction<{ id: number; value: number }>,
    ) => {
      state.counters[action.payload.id].value = action.payload.value;
    },
    updateLabel: (
      state,
      action: PayloadAction<{ id: number; value: string }>,
    ) => {
      state.counters[action.payload.id].name = action.payload.value;
    },
    updateGoal: (
      state,
      action: PayloadAction<{ id: number; value: number | null }>,
    ) => {
      state.counters[action.payload.id].goal = action.payload.value;
    },
    updateTheme: (
      state,
      action: PayloadAction<{ id: number; value: string }>,
    ) => {
      state.counters[action.payload.id].theme = action.payload.value;
    },
    updateIcon: (
      state,
      action: PayloadAction<{ id: number; value: string }>,
    ) => {
      state.counters[action.payload.id].icon = action.payload.value;
    },
    resetValue: (state, action: PayloadAction<number>) => {
      state.counters[action.payload].value = 0;
    },
    resetLabel: (state, action: PayloadAction<number>) => {
      state.counters[action.payload].name = "";
    },
    resetGoal: (state, action: PayloadAction<number>) => {
      state.counters[action.payload].goal = null;
    },
    deleteCounter: (state, action: PayloadAction<number>) => {
      if (state.current !== 0 && state.current! >= action.payload) {
        state.current! -= 1;
      }
      // state.counters = state.counters.toSpliced(action.payload, 1);
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
  setCounters,
  setCurrentCounter,
  addCounter,
  // updateCounter,
  deleteCounter,
  increaseCounter,
  decreaseCounter,
  resetCounter,
} = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCounters = (state: RootState) => state.counters.counters;
export const selectCurrentCounter = (state: RootState) =>
  state.counters.current;

export default counterSlice.reducer;

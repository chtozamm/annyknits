import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/lib/redux/store"

type Counter = {
  value: number
  name: string
  theme: string
  icon: string
  goal: number | null
}

// Define a type for the slice state
interface CounterState {
  counters: Counter[]
  current: number | null
  split: number | null
}

// Define the initial state using that type
const initialState: CounterState = {
  counters: [],
  current: null,
  split: null,
}

export const countersSlice = createSlice({
  name: "counters",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setCounterState: (state, action: PayloadAction<Counter[]>) => {
      state.counters = action.payload
    },

    setCurrentCounter: (state, action: PayloadAction<number>) => {
      state.current = action.payload
    },
    setSplitCounter: (state, action: PayloadAction<number | null>) => {
      state.split = action.payload
    },
    addCounter: (state, action: PayloadAction<Counter>) => {
      state.counters.push(action.payload)
    },
    updateValue: (
      state,
      action: PayloadAction<{ id: number; value: number }>,
    ) => {
      state.counters[action.payload.id].value = action.payload.value
    },
    updateLabel: (
      state,
      action: PayloadAction<{ id: number; value: string }>,
    ) => {
      state.counters[action.payload.id].name = action.payload.value
    },
    updateGoal: (
      state,
      action: PayloadAction<{ id: number; value: number | null }>,
    ) => {
      state.counters[action.payload.id].goal = action.payload.value
    },
    updateTheme: (
      state,
      action: PayloadAction<{ id: number; value: string }>,
    ) => {
      state.counters[action.payload.id].theme = action.payload.value
    },
    updateIcon: (
      state,
      action: PayloadAction<{ id: number; value: string }>,
    ) => {
      state.counters[action.payload.id].icon = action.payload.value
    },
    resetValue: (state, action: PayloadAction<number>) => {
      state.counters[action.payload].value = 0
    },
    resetLabel: (state, action: PayloadAction<number>) => {
      state.counters[action.payload].name = ""
    },
    resetGoal: (state, action: PayloadAction<number>) => {
      state.counters[action.payload].goal = null
    },
    deleteCounter: (state, action: PayloadAction<number>) => {
      if (state.current !== 0 && state.current! >= action.payload) {
        state.current! -= 1
      }
      state.counters = state.counters.toSpliced(action.payload, 1)
    },
    increaseCounter: (state, action: PayloadAction<number>) => {
      state.counters[action.payload].value += 1
    },
    decreaseCounter: (state, action: PayloadAction<number>) => {
      state.counters[action.payload].value -= 1
    },
    resetCounter: (state, action: PayloadAction<number>) => {
      state.counters[action.payload].value = 0
    },
  },
})

export const {
  setCounterState,
  setCurrentCounter,
  setSplitCounter,
  addCounter,
  updateLabel,
  updateValue,
  updateGoal,
  updateTheme,
  updateIcon,
  deleteCounter,
  increaseCounter,
  decreaseCounter,
  resetCounter,
  resetGoal,
  resetLabel,
  resetValue,
} = countersSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCounters = (state: RootState) => state.counters.counters
export const selectCurrentCounter = (state: RootState) => state.counters.current
export const selectSplitCounter = (state: RootState) => state.counters.split

export default countersSlice.reducer

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/lib/redux/store"

type Page = "counter" | "settings"

// Define a type for the slice state
interface PageState {
  current: Page
}

// Define the initial state using that type
const initialState: PageState = {
  current: "counter",
}

export const pageSlice = createSlice({
  name: "page",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setPageState: (state, action: PayloadAction<Page>) => {
      state.current = action.payload
    },
  },
})

export const { setPageState } = pageSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentPage = (state: RootState) => state.page.current

export default pageSlice.reducer

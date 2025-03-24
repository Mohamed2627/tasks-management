import { createSlice, } from "@reduxjs/toolkit";
import { THEMES_MODE } from "../../enum";

export type TThemeState = {
  currentTheme: THEMES_MODE
}

const initialState: TThemeState = {
  currentTheme: THEMES_MODE.LIGHT,
}

const themeReducer = createSlice({
  name: "theme-mode",
  initialState: initialState,
  reducers: {
    setThemeMode: (state, action) => {
      state.currentTheme = action.payload
    }
  }
})

export default themeReducer.reducer

export const { setThemeMode } = themeReducer.actions
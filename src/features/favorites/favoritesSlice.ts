import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ProductType } from "../../Api/ProductApi";

export interface FavoritesState {
  items: ProductType[];
}
const loadFavorites = (): ProductType[] => {
  try {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};
const initialState: FavoritesState = {
  items: loadFavorites(),
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<ProductType>) => {
      const exists = state.items.find((p) => p.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(state.items));
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },

    clearFavorites: (state) => {
      state.items = [];
      localStorage.removeItem("favorites");
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToFavorites, removeFromFavorites, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;

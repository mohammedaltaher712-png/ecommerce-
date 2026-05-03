import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mobileMenuOpen: false,
  dropdownOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // MOBILE MENU
    openMenu: (state) => {
      state.mobileMenuOpen = true;
      state.dropdownOpen = false; // 👈 يقفل الثاني
    },
    closeMenu: (state) => {
      state.mobileMenuOpen = false;
    },
    toggleMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
      state.dropdownOpen = false; // 👈 مهم جدًا
    },

    // DROPDOWN
    openDropdown: (state) => {
      state.dropdownOpen = true;
      state.mobileMenuOpen = false; // 👈 يقفل الثاني
    },
    closeDropdown: (state) => {
      state.dropdownOpen = false;
    },
    toggleDropdown: (state) => {
      state.dropdownOpen = !state.dropdownOpen;
      state.mobileMenuOpen = false; // 👈 مهم جدًا
    },
  },
});

export const {
  openMenu,
  closeMenu,
  toggleMenu,
  openDropdown,
  closeDropdown,
  toggleDropdown,
} = uiSlice.actions;

export default uiSlice.reducer;
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductType } from "../../Api/ProductApi";

type CartItem = ProductType & {
  quantityCart: number;
};

type CartState = {
  items: CartItem[];
};

const getCart = (): CartItem[] => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

const initialState: CartState = {
  items: getCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increaseQty: (state, action: PayloadAction<number | string>) => {
      const item = state.items.find(
        (p) => String(p.id) === String(action.payload),
      );
      if (item) item.quantityCart++;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    decreaseQty: (state, action: PayloadAction<number | string>) => {
      const item = state.items.find(
        (p) => String(p.id) === String(action.payload),
      );

      if (!item) return;

      // ⛔ لا تسمح بالنزول أقل من 1
      if (item.quantityCart <= 1) {
        item.quantityCart = 1;
        return;
      }

      item.quantityCart--;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    toggleCartItem: (state, action: PayloadAction<ProductType>) => {
      const item = state.items.find(
        (p) => String(p.id) === String(action.payload.id),
      );

      if (item) {
        state.items = state.items.filter(
          (p) => String(p.id) !== String(action.payload.id),
        );
      } else {
        state.items.push({
          ...action.payload,
          quantityCart: 1,
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<number | string>) => {
      state.items = state.items.filter(
        (p) => String(p.id) !== String(action.payload),
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});
export const {
  removeFromCart,
  clearCart,
  toggleCartItem,
  decreaseQty,
  increaseQty,
} = cartSlice.actions;

export default cartSlice.reducer;

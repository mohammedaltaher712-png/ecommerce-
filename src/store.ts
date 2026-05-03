import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./features/menu/StateMenu";
import { authApi } from "./Api/AuthApi";
import AuthReducer from "./features/StateAuth";
import { productApi } from "./Api/ProductApi";
import { CategoryApi } from "./Api/CategoryApi";
import cartReducer from "./features/cart/cartSlice";
import favoritesReducer from "./features/favorites/favoritesSlice";
import { orderApi } from "./Api/orderApi";
import { brandstApi } from "./Api/BrandApi";
import { addressApi } from "./Api/AddressApi";
export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: AuthReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [CategoryApi.reducerPath]: CategoryApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [brandstApi.reducerPath]: brandstApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(productApi.middleware)
      .concat(CategoryApi.middleware)
      .concat(orderApi.middleware)
      .concat(brandstApi.middleware)
      .concat(addressApi.middleware),
  // 🔥 هذا الحل الأساسي
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

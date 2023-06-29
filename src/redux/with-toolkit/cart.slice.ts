import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/product";

/** Selectors */
export const selectProductsCount = (rootReducer: {
  cartReducer: { products: Product[] };
}) => {
  return rootReducer.cartReducer.products.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );
};

export const selectProductsTotalPrice = (rootReducer: {
  cartReducer: { products: Product[] };
}) => {
  return rootReducer.cartReducer.products.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
};

export type CartState = {
  products: Product[];
};

const initialState: CartState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const productIsAlreadyInCart = state.products.some(
        (product: Product) => product.name === action.payload.name
      );

      //se ele estiver, aumentar a sua quantidade em 1
      if (productIsAlreadyInCart) {
        state.products = state.products.map((product: Product) =>
          product.name === action.payload.name
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );

        return;
      }

      //se ele não estiver, adicioná-lo
      state.products = [...state.products, { ...action.payload, quantity: 1 }];
    },

    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.name !== action.payload.name
      );
    },

    increaseProductQuantity: (state, action) => {
      state.products = state.products.map((product) =>
        product.name === action.payload.name
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
    },

    decreaseProductQuantity: (state, action) => {
      state.products = state.products
        .map((product) =>
          product.name === action.payload.name
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
        .filter((product) => product.quantity > 0);
    },
  },
});

export const {
  addProduct,
  removeProduct,
  increaseProductQuantity,
  decreaseProductQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;

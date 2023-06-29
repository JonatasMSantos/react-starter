import { AnyAction } from "redux";
import { Product } from "../../../types/product";

export enum CartActionTypes {
  ADD_PRODUCT = "cart/addProduct",
  REMOVE_PRODUCT = "cart/removeProduct",
  INCREASE_PRODUCT = "cart/increaseProduct",
  DECREASE_PRODUCT = "cart/decreaseProduct",
}

export type CartState = {
  products: Product[];
};

const initialState: CartState = {
  products: [],
};

export const addProductToCart = (payload: Product) => ({
  type: CartActionTypes.ADD_PRODUCT,
  payload,
});

export const removeProductFromCart = (payload: { name: string }) => ({
  type: CartActionTypes.REMOVE_PRODUCT,
  payload,
});

export const increaseProductFromCart = (payload: { name: string }) => ({
  type: CartActionTypes.INCREASE_PRODUCT,
  payload,
});

export const decreaseProductFromCart = (payload: { name: string }) => ({
  type: CartActionTypes.DECREASE_PRODUCT,
  payload,
});

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

export const cartReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CartActionTypes.ADD_PRODUCT: {
      //verificar se o produto já está no carrinho
      const productIsAlreadyInCart = state.products.some(
        (product: Product) => product.name === action.payload.name
      );

      //se ele estiver, aumentar a sua quantidade em 1
      if (productIsAlreadyInCart) {
        return {
          ...state,
          products: state.products.map((product) =>
            product.name === action.payload.name
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
        };
      }

      //se ele não estiver, adicioná-lo
      return {
        ...state,
        products: [...state.products, { ...action.payload, quantity: 1 }],
      };
    }

    case CartActionTypes.REMOVE_PRODUCT: {
      return {
        ...state,
        products: state.products.filter(
          (product) => product.name !== action.payload.name
        ),
      };
    }

    case CartActionTypes.INCREASE_PRODUCT: {
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.name === action.payload.name) {
            return { ...product, quantity: product.quantity + 1 };
          } else {
            return product;
          }
        }),
      };
    }

    case CartActionTypes.DECREASE_PRODUCT: {
      return {
        ...state,
        products: state.products
          .map((product) => {
            if (product.name === action.payload.name) {
              return { ...product, quantity: product.quantity - 1 };
            } else {
              return product;
            }
          })
          .filter((product) => product.quantity > 0),
      };
    }

    default:
      return state;
  }
};
//const cartReducer = (state = inicialState, action) => {};

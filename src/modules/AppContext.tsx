import {
  createContext,
  useState,
  useContext,
  useReducer,
  Dispatch,
  PropsWithChildren
} from 'react';

import { CartItem, Product } from '@/types';

type Action = {
  type: 'add' | 'remove' | 'delete';
  product: Product;
};

const CartStateContext = createContext<CartItem[]>([]);
const CartDispatchContext = createContext<Dispatch<Action>>(() => null);

const cartReducer = (state: CartItem[], action: Action) => {
  const { product, type } = action;

  const item = getItem(state, product);

  if (type === 'add') {
    return item
      ? state.map(cartItem =>
          cartItem.id === product.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      : [...state, { ...product, quantity: 1 }];
  }

  if (type === 'remove') {
    return item?.quantity === 1
      ? state.filter(cartItem => cartItem.id !== product.id)
      : state.map(cartItem =>
          cartItem.id === product.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
  }

  if (type === 'delete') {
    return state.filter(cartItem => cartItem.id !== product.id);
  }

  return state;
};

const getItem = (cart: CartItem[], product: Product) =>
  cart.find(item => item.id === product.id);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useReducer(cartReducer, []);

  return (
    <CartDispatchContext.Provider value={setCart}>
      <CartStateContext.Provider value={cart}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useDispatchCart = () => useContext(CartDispatchContext);
export const useCart = () => useContext(CartStateContext);

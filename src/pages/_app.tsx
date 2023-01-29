import { NextUIProvider } from '@nextui-org/react';
import { CartProvider } from '@/modules/AppContext';

import type { AppProps } from 'next/app';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </NextUIProvider>
  );
}

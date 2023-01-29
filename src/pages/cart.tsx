/** Hooks */
import { useCart } from '@/modules/AppContext';

/** Components */
import { Container, Grid, Spacer, Text } from '@nextui-org/react';
import Head from 'next/head';
import { CartItem } from '@/components/CartItem';

export default function Cart() {
  const cart = useCart();

  return (
    <>
      <Head>
        <title>Cart | Shopping app</title>
      </Head>
      <main>
        <Spacer y={2} />
        <Container lg>
          <header>
            <Text h1 color="white">
              Cart
            </Text>
          </header>
          <section>
            <Grid.Container gap={2}>
              {cart.map(item => (
                <CartItem item={item} key={item.id} />
              ))}
            </Grid.Container>
          </section>
        </Container>
      </main>
    </>
  );
}

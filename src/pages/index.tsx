import Head from 'next/head';
import { Inter } from '@next/font/google';
import { Card, Container, Grid, Spacer, Text } from '@nextui-org/react';
import ky from 'ky';
import SiteHeader from '@/components/SiteHeader';
import { Product } from '@/types';
import { GetServerSideProps } from 'next';
import { ProductCard } from '@/components/ProductCard';

const inter = Inter({ subsets: ['latin'] });

type Response = {
  products: Product[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { products }: Response = await ky(
      'https://dummyjson.com/products?limit=8'
    ).json();

    return {
      props: { products }
    };
  } catch (error) {
    console.error(error);
    return {
      props: { products: [] }
    };
  }
};

export default function Home({ products }: { products: Product[] }) {
  return (
    <>
      <Head>
        <title>Shopping App</title>
        <meta name="description" content="Testing NextUI library" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <header className="store-hero">
          <SiteHeader />
          <Spacer y={2} />
          <Container md>
            <Card variant="bordered">
              <Card.Body css={{ padding: '$24' }}>
                <Text
                  h1
                  css={{ textGradient: '45deg, $blue600 -20%, $pink600 50%' }}
                >
                  Welcome to NextUI + Next.js Shopping App
                </Text>
                <Text size={24}>
                  This is a simple shopping app built with NextUI and Next.js.
                  This is a demo app to try out NextUI components.
                </Text>
              </Card.Body>
            </Card>
          </Container>
          <Grid.Container gap={2} justify="center">
            {products.map(product => (
              <Grid key={product.id} xs={6} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid.Container>
        </header>
      </main>
    </>
  );
}

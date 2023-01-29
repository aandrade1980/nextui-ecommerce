/** Components */
import { Button, Card, Col, Row, Spacer, Text } from '@nextui-org/react';

/** Hooks */
import { useState } from 'react';
import { useCart, useDispatchCart } from '@/modules/AppContext';

/** Types */
import { Product } from '@/types';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const cart = useCart();
  const setCart = useDispatchCart();

  const initialState = Boolean(cart.find(item => item.id === product.id));

  const [isAdded, setIsAdded] = useState(initialState);

  const handleAddToCart = () => {
    setCart({ type: 'add', product });
    setIsAdded(true);
  };

  const { id, title, description, price, images } = product;

  return (
    <Card isPressable variant="bordered" css={{ w: '100%', h: '500px' }}>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={images[0]}
          objectFit="cover"
          width="100%"
          height="100%"
          alt={title}
        ></Card.Image>
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: 'absolute',
          p: '$8',
          bgBlur: '#ffffffcc',
          borderTop: '$borderWeights$light solid rgba(255, 255, 255, 0.2)',
          bottom: 0,
          zIndex: 1
        }}
      >
        <Row>
          <Col>
            <Row justify="space-between">
              <Col>
                <Text h3>{title}</Text>
                <Text size="$sm">{description}</Text>
              </Col>
              <Col css={{ width: 'auto' }}>
                <Text
                  css={{
                    color: '$accents7',
                    fontWeight: '$semibold',
                    fontSize: '$2xl',
                    pl: '$12'
                  }}
                >
                  ${price}
                </Text>
              </Col>
            </Row>
            <Spacer y={1} />
            <Button
              disabled={isAdded}
              onClick={handleAddToCart}
              css={{ w: '100%' }}
            >
              Add to card
            </Button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
}

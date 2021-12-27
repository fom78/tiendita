import * as React from "react";
import { Button, Flex, Grid, Image, Link, Stack, Text } from "@chakra-ui/react";

import { Product } from "../../product/types";
import { parseCurrency } from "../../utils/currency";
import ProductCard from "../components/ProductCard";

interface Props {
  products: Product[];
}

const phoneNumber: string = `543489656693`

const StoreScreen: React.FC<Props> = ({ products }) => {
  const [cart, setCart] = React.useState<Product[]>([]);
  const text = React.useMemo(
    () =>
      cart
        .reduce(
          (message, product) =>
            message.concat(`* ${product.title} - ${parseCurrency(product.price)}\n`),
          ``,
        )
        .concat(
          `\nTotal: ${parseCurrency(cart.reduce((total, product) => total + product.price, 0))}`,
        ),
    [cart],
  );

  return (
    <Stack spacing={6}>
      {Boolean(products.length)?
      <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
      {products.map((product) => (
        <ProductCard 
          product={product} 
          key={product.id} 
          onAdd={(product) => setCart((cart) => cart.concat(product))}/>
      ))}
    </Grid>
    : <Text color="gray.500" fontSize="lg" margin="auto">No hay productos!!</Text>}
      {Boolean(cart.length) && (
        <Flex alignItems="center" bottom={4} justifyContent="center" position="sticky">
          <Button
            isExternal
            as={Link}
            colorScheme="whatsapp"
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`}
            width="fit-content"
          >
            Completar pedido ({cart.length} productos)
          </Button>
        </Flex>
      )}
    </Stack>
  );
};


export default StoreScreen;

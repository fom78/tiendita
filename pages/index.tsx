import React from "react";
import { GetStaticProps } from "next";
import { Button, Flex, Grid, Image, Link, Stack, Text } from "@chakra-ui/react";

import { Product } from "../product/types";
import api from "../product/api";

interface Props {
  products: Product[];
}

function parseCurrency(value: number): string {
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
}
const phoneNumber: string = `543489656693`

const IndexRoute: React.FC<Props> = ({ products }) => {
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
      <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
        {products.map((product) => (
          <Stack
          key={product.id}
          alignItems="center"
          borderColor="gray.100"
          borderRadius="md"
          borderWidth={1}
          data-testid="product"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
            <Stack direction="row" padding={2} spacing={4} width="100%">
              <Image
                backgroundColor="white"
                borderRadius="md"
                height={{ base: 24, sm: 36 }}
                loading="lazy"
                minWidth={{ base: 24, sm: 36 }}
                objectFit="contain"
                src={product.image}
                width={{ base: 24, sm: 36 }}
              />
              <Stack justifyContent="space-between" spacing={1} width="100%">
                <Stack spacing={1}>
                  <Text fontWeight="500">{product.title}</Text>
                  <Text color="gray.500" fontSize="sm">
                    {product.description}
                  </Text>
                </Stack>
                <Stack alignItems="flex-end" direction="row" justifyContent="space-between">
                  <Text color="green.500" fontSize="sm" fontWeight="500">
                    {parseCurrency(product.price)}
                  </Text>
                  <Button
                    size="xs"
                    onClick={() => setCart((cart) => cart.concat(product))}
                  >
                    Agregar
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Grid>
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

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();

  return {
    revalidate: 10,
    props: {
      products,
    },
  };
};

export default IndexRoute;

import * as React from "react";
import { Button, Flex, Grid, Image, Link, Stack, Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, 
  useDisclosure,
  Input} from "@chakra-ui/react";

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

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()


  return (
    <>
      <Stack spacing={6}>
        {Boolean(products.length) ?
          <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
            {products.map((product) => (
              <ProductCard
                product={product}
                key={product.id}
                onAdd={(product) => setCart((cart) => cart.concat(product))} />
            ))}
          </Grid>
          : <Text color="gray.500" fontSize="lg" margin="auto">No hay productos!!</Text>}
        {Boolean(cart.length) && (
          <Flex alignItems="center" bottom={4} justifyContent="center" position="sticky">
            <Button
              isExternal
              colorScheme="whatsapp"
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`}
              width="fit-content"
              onClick={onOpen}
            >
              Ver Carrito
            </Button>
          </Flex>
        )}
      </Stack>
      <Button ref={btnRef} colorScheme='blue' onClick={onOpen}>
        Open
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder='Type here...' />
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Limpiar
            </Button>
            <Button
              isExternal
              as={Link}
              colorScheme="whatsapp"
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`}
              width="100%"
              size="md"
            >
              Completar pedido ({cart.length} productos)
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};


export default StoreScreen;

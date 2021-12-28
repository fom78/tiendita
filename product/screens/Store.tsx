import * as React from "react";
import {
  Button, Flex, Grid, Image, Link, Stack, Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  List,
  ListItem,
  Input,
  Box,
  HStack
} from "@chakra-ui/react";

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

  function handleRemoveFromCart(index: number) {
    setCart(cart => cart.filter((_, _index) => _index !== index))
  }
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
              colorScheme="blue"
              width="fit-content"
              onClick={onOpen}
            >
              <Text pr="2" color="white.900" >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              </Text>
              
              Ver Carrito
            </Button>
          </Flex>
        )}
      </Stack>
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
            <List spacing={3}>
              {cart.map((product, index) => 
                <ListItem key={product.id}>
                  <HStack justifyContent="space-between">
                    <Text>{product.title}</Text>
                    <HStack>
                      <Text>{parseCurrency(product.price)}</Text>
                      <Button colorScheme="red" onClick={() => handleRemoveFromCart(index)}>X</Button>
                    </HStack>
                  </HStack>
                </ListItem>)}
            </List>

          </DrawerBody>

          <DrawerFooter>
            <Flex>
              {/* <Box flexDirection="column" > */}
              <Button variant='outline' mr={3} onClick={onClose}>
                L
              </Button>
              <Button
                isExternal
                as={Link}
                colorScheme="whatsapp"
                href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`}
                // width="80%"
                size="md"
              >
                Completar [ {cart.length} ] productos
              </Button>
              {/* </Box> */}
            </Flex>


          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};


export default StoreScreen;

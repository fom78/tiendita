import  {useMemo, useState, FC} from "react";
import {
  Button, Flex, Grid, Stack, Text,
  useDisclosure
} from "@chakra-ui/react";

import { Product } from "../../product/types";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";

interface Props {
  products: Product[];
}
interface CartItem extends Product {
  quantity: number;
}



const StoreScreen: FC<Props> = ({ products }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

 
  const totalProductsInCart = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]
  )


  function handleAddToCart(product: Product) {
    setCart(cart => {
      const isInCart = cart.some(item => item.id === product.id)
      if (isInCart) {
        return cart.map(item => item.id === product.id
          ? {
            ...item,
            quantity: item.quantity + 1
          }
          : item
        )
      }
      return cart.concat({ ...product, quantity: 1 })
    })
  }
  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleIncrementquantity(productId: Product["id"]) {
    setCart(cart => {
      const isInCart = cart.some(item => item.id === productId)
      if (isInCart) {
        return cart.map(item => item.id === productId
          ? {
            ...item,
            quantity: item.quantity + 1
          }
          : item
        )
      }
    })

  }

  function handleDecrementquantity(productId: Product["id"]) {
    setCart(cart => {
      const isInCart = cart.some(item => item.id === productId)
      if (isInCart) {
        return cart.map(item => item.id === productId
          ? {
            ...item,
            quantity: item.quantity - 1
          }
          : item
        )
      }
    })
  }

  return (
    <>
      <Stack spacing={6}>
        {Boolean(products.length) ?
          <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
            {products.map((product) => (
              <ProductCard
                product={product}
                key={product.id}
                onAdd={handleAddToCart} />
            ))}
          </Grid>
          : <Text color="gray.500" fontSize="lg" margin="auto">No hay productos!!</Text>}
        {Boolean(cart.length) && (
          <Flex alignItems="center" bottom={4} justifyContent="center" position="sticky">
            <Button
              // isExternal
              colorScheme="blue"
              width="fit-content"
              onClick={onOpen}
            >
              <Text pr="2" color="white.900" fontWeight={500}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
              </Text>
              {totalProductsInCart}{" "} {totalProductsInCart === 1 ? `Producto` : `Productos`}
            </Button>
          </Flex>
        )}
      </Stack>
      <Cart 
        items={cart}
        onClose={onClose}
        isOpen={isOpen}
        totalProductInCart={totalProductsInCart}
        onDecrement={handleDecrementquantity}
        onIncrement={handleIncrementquantity}
      />
    </>
  );
};


export default StoreScreen;

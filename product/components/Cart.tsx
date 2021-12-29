import { FC, useMemo, useRef } from "react";

import {
    Button, Flex, Link, Stack, Text,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    HStack,
    Divider,
    DrawerProps
  } from "@chakra-ui/react";

import { CartItem, Product } from "../types";
import { parseCurrency } from "../../utils/currency";

interface Props extends Omit<DrawerProps, "children"> {
    items: CartItem[]
    totalProductInCart: number
    onIncrement: (productId: Product["id"]) => void
    onDecrement: (productId: Product["id"]) => void

}
const phoneNumber: string = `543489656693`

const Cart: FC<Props> = ({items, onDecrement, onIncrement, totalProductInCart, ...props}) => {
  const btnRef = useRef()

    const totalAPagar = useMemo(
        () => parseCurrency(items.reduce((total, product) => total + (product.price * product.quantity), 0)), [items]
      )
    const textWhatsApps = useMemo(
        () =>
          items
            .reduce(
              (message, product) =>
                message.concat(`* ${product.title} - ${parseCurrency(product.price * product.quantity)}\n`),
              ``,
            )
            .concat(
              `\nTotal: ${totalAPagar}`,
            ),
        [items, totalAPagar]
      );
    return (
        <Drawer
        placement='right'
        size="sm"
        finalFocusRef={btnRef}
        {...props}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Detalle Pedido</DrawerHeader>

          <DrawerBody>
            <Stack spacing={3} divider={<Divider />}>
              {items.map((product, index) => {
                return Boolean(product.quantity) && (
                  <HStack key={product.id}>
                    <Stack width="100%">
                      <HStack justifyContent="space-between">
                        <Text fontSize="xs" fontWeight={500} >{product.title} {product.quantity > 1 ? `x${product.quantity}` : ``}</Text>
                        <Text fontWeight={500} color="blue.500">{parseCurrency(product.price * product.quantity)}</Text>
                      </HStack>
                      <HStack>
                        <Button size="xs" onClick={() => onDecrement(product.id)}>-</Button>
                        <Text>{product.quantity}</Text>
                        <Button size="xs" onClick={() => onIncrement(product.id)}>+</Button>
                      </HStack>
                    </Stack>
                  </HStack>
                )
              }
              )}
            </Stack>
            <Text>{totalAPagar}</Text>

          </DrawerBody>

          <DrawerFooter>
            <Flex>
              {/* <Box flexDirection="column" > */}
              {/* <Button variant='outline' mr={3} onClick={onClose}>
                L
              </Button> */}
              <Button
                isExternal
                as={Link}
                colorScheme="whatsapp"
                href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(textWhatsApps)}`}
                // width="80%"
                size="md"
              >
                Completar [ {totalProductInCart} ] productos
              </Button>
              {/* </Box> */}
            </Flex>


          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
}

export default Cart
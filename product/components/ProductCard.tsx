import { FC } from "react";

import { Button, Image, Stack, Text } from "@chakra-ui/react";

import { Product } from "../types";
import { parseCurrency } from "../../utils/currency";

interface Props {
    product: Product;
    onAdd: (product: Product) => void
}

const ProductCard: FC<Props> = ({product,onAdd}) => {

    return (
        <Stack
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
                  onClick={() => onAdd(product)}
                >
                  Agregar
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
    )
}

export default ProductCard
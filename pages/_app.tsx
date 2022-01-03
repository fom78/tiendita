import * as React from "react";
import {
  ChakraProvider,
  Heading,
  Text,
  Image,
  Container,
  VStack,
  Box,
  Divider,
} from "@chakra-ui/react";
import {AppProps} from "next/app";

import theme from "../theme";

const App: React.FC<AppProps> = ({Component, pageProps}) => {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={4}>
        <Container
          backgroundColor="white"
          borderRadius="sm"
          boxShadow="md"
          maxWidth="container.xl"
          padding={4}
        >
          <VStack marginBottom={6}>
            {/* <Image borderRadius={9999} src="//placehold.it/128x128" /> */}
            <Image 
              borderRadius="lg"
              src="/assets/banner.jpg" 
              // height={{ base: 24, sm: 36 }}
              height="50%"
              // minWidth={{ base: 24, sm: 36 }}
              objectFit="contain"
              // width={{ base: 24, sm: 36 }}
            />        
            <Heading fontSize={{ base: '24px', md: '40px', lg: '56px' }}>Aromas del Corazon</Heading>
            <Text fontSize={{ base: '18px', md: '24px', lg: '40px' }}>Desde el corazon a tus ambientes</Text>
          </VStack>
          <Divider marginY={6} />
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default App;

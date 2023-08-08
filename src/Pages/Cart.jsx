import React from "react";
import {
  Box,
  Text,
  Flex,
  Heading,
  Image,
  HStack,
  Grid,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
function Cart(props) {
  const abv = JSON.parse(localStorage.getItem("cart"))||[]
  console.log(abv)
  
  return (
    <Box border="2px solid gray" h="98vh" m="0.3rem" mt={80}>
      <Flex borderBottom={"2px solid gray"}>
        <Box w="40%" p="0.4rem" borderRight={"2px solid gray"}>
          <HamburgerIcon />
        </Box>
        <Flex w="60%" p="0.4rem" justifyContent={"space-between"}>
          <Text>Cart</Text>
          <CloseIcon />
        </Flex>
      </Flex>

      <Flex>
        <Box width={"40%"} h="92vh" borderRight={"2px solid gray"} p="7rem">
          <Heading fontSize={"3rem"}>HAAN</Heading>
          <Heading fontSize={"3rem"}>SANITAIZERS</Heading>
          <Text>Turning care around</Text>
        </Box>

        <Box width={"60%"} h="92vh" >
          <Flex
            justifyContent={"space-between"}
            borderBottom={"2px solid gray"}
          >
            <Image
              w="25%"
              src="https://www.befunky.com/images/prismic/1f427434-7ca0-46b2-b5d1-7d31843859b6_funky-focus-red-flower-field-after.jpeg?auto=avif,webp&format=jpg&width=863"
            />
            <HStack justify={"space-between"}>
              <Grid templateColumns="repeat(3, 1fr)" gap={10}>
                <Text mr="1rem">GENTAL PALOMA</Text>
                <Text ml="2rem">-1+</Text>
                <Text>20,99$</Text>
              </Grid>
            </HStack>
          </Flex>

          <Flex
            justifyContent={"space-between"}
            borderBottom={"2px solid gray"}
          >
            <Image
              w="25%"
              src="https://www.befunky.com/images/prismic/1f427434-7ca0-46b2-b5d1-7d31843859b6_funky-focus-red-flower-field-after.jpeg?auto=avif,webp&format=jpg&width=863"
            />
            <HStack justify={"space-between"}>
              <Grid templateColumns="repeat(3, 1fr)" gap={10}>
                <Text mr="1rem">GENTAL PALOMA</Text>
                <Text ml="2rem">-1+</Text>
                <Text>20,99$</Text>
              </Grid>
            </HStack>
          </Flex>
          <Flex
            justifyContent={"space-between"}
            borderBottom={"2px solid gray"}
          >
            <Image
              w="25%"
              src="https://www.befunky.com/images/prismic/1f427434-7ca0-46b2-b5d1-7d31843859b6_funky-focus-red-flower-field-after.jpeg?auto=avif,webp&format=jpg&width=863"
            />
            <HStack justify={"space-between"}>
              <Grid templateColumns="repeat(3, 1fr)" gap={10}>
                <Text mr="1rem">GENTAL PALOMA</Text>
                <Text ml="2rem">-1+</Text>
                <Text>20,99$</Text>
              </Grid>
            </HStack>
          </Flex>

          <Flex borderBottom={"2px solid gray"} p="1rem" justifyContent={"space-between"} ml="12.6rem" borderLeft={"2px solid gray"}>
            <Text w="6rem" fontSize={"0.7rem"}>Shoping calculated in count</Text>
            <Text fontSize={"0.7rem"}>Total</Text>
            <Text>50$</Text>
          </Flex>

          <Flex justifyContent={"end"} p="1rem" borderLeft="2px solid gray" ml="12.58rem">
          <Button color="white" bg="orange">
          checkout
          </Button>
          </Flex>
        </Box>
      </Flex>
     
    </Box>
  );
}

export default Cart;

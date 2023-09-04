import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import React from 'react';
 

function ThankYou({id}) {
    return (
        <Box   >
          <Heading as="h1" size="2xl">
            THANK YOU FOR ORDER
          </Heading>
          <Text mt="0.8rem">
            Your order id is: {id} <br /> You can track your order on your
            personal account or continue shoping.
          </Text>
          <Text mt="3rem" fontSize={"2rem"} color="gray">
            FOLLOW US ON INSTAGRAM @haanSanitizer
          </Text>

          <Flex justifyContent={"space-evenly"} pt={"20px"}>
            <Link href="/" color={"red.400"}>
              Go To HomePage
            </Link>
            <Link href="/product" color={"green.800"}>
              Continue Shoping
            </Link>
          </Flex>
        </Box>
    );
}

export default ThankYou;
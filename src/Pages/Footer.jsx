import React from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  useMediaQuery,
  Divider,
  VStack,
} from "@chakra-ui/react";

import Links from "./Links";
import Social from "./Social";

const Footer = () => {
  const [isSmallScreen] = useMediaQuery("(max-width: 420px)");

  return (
    <>
      <Divider
        borderWidth="1px"
        borderColor="black"
        borderStyle="solid"
        mt={"5rem"}
        mb={"2rem"}
      />

      <Flex m={"0 2rem"} flexDir={isSmallScreen && "column"}>
        <Box width={"30%"} m={"auto"}>
          <Flex flexDir={"column"} alignContent={"center"} textAlign={"center"}>
            <img
              src="https://haanready.com/cdn/shop/files/logo-haan_2x_16964a1d-b477-4a38-a47d-4d229ac3f2e7.png?v=1614428222"
              alt="Logo"
              width={"100px"}
              height={"80px"}
              m="auto"
            />

            <Text
              fontSize={"12px"}
             
              mt={"10px"}
              w={"80%"}
            >
              A natural personal care brand that focuses its activity on
              defining a better future for the planet and humanity.
            </Text>
          </Flex>
        </Box>
        <Box width={"30%"} m={"auto"}>
          <Flex justifyContent={"space-evenly"} textAlign={"left"}>
            <VStack spacing={1}>
              <Links text="Newsletter" />
              <Links text="Purpose" />
              <Links text="Stockist" />
              <Links text="Contact" />
              <Links text="Hotels" />
              <Links text="Affiliate" />
              <Links text="FAQs" />
            </VStack>
            <VStack spacing={1}>
              <Links text="Terms &amp; Conditions" />
              <Links text="Deliveries &amp; Returns" />
              <Links text="Refund Policy" />
              <Links text="Cookies Policy" />
              <Links text="Privacy Policy" />
              <Links text="Affiliate" />
              <Links text="Legal Notice" />
            </VStack>
          </Flex>
        </Box>
        <Box width={"30%"} m={"auto"}>
          <Flex flexDir={"column"}>
            <Text color={"red"}>Ready to stay in touch ?</Text>

            <Input
              type="email"
              placeholder="Your Email"
              border="none"
              borderBottom="2px solid black"
            />

            <Box>
              <Social />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Footer;

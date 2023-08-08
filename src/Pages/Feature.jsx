import { Box, Button, Flex, Heading, Image, Text, useMediaQuery } from '@chakra-ui/react';
import React, { useState } from 'react';

function Feature({ name, title, dir, description, color, image, btn }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSmallScreen] = useMediaQuery("(max-width: 720px)");

  return (
    <Flex flexDir={isSmallScreen ? "column-reverse" : dir ? "row-reverse" : "row"} m="3rem 0rem">
      <Box width={isSmallScreen ? "100%" : "50%"}
      pb={isSmallScreen&& "18px"}
      bg={color} color="white" textAlign="center">
        <Text>{name}</Text>
        <Heading fontSize="3.5rem" fontWeight={"500"}>{title}</Heading>
        <Text w="60%" m="auto" fontSize={"18px"}>
          {description}
        </Text>

        <Button
          padding="11px 60px"
          bg={isHovered ? "white" : "transparent"}
          borderRadius="20px"
          mt="50px"
          color={isHovered ? `${color}` : "white"}
          border="1px solid white"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            transition: "background-color .9s",
          }}
        >
          {btn}
        </Button>
      </Box>
      <Box width={isSmallScreen ? "100%" : "50%"}>
        <Image src={image} width="100%" height={isSmallScreen ? "auto" : "400px"} objectFit={"cover"} />
      </Box>
    </Flex>
  );
}

export default Feature;

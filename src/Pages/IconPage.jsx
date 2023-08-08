import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

function IconPage({ icon, text ,isSingle}) {
  return (
    <Flex
      flexDir="column"
      m="11px"
      textAlign="center"
      alignItems="center"
      w={isSingle ===false &&["30px", "40px", "60px"]}
    >
      <Box>
        <Image src={icon} maxWidth={["20px", "30px", "40px"]} />
      </Box>
      <Text
        fontSize={["12px", "14px", "16px"]}
        fontWeight="300"
        lineHeight="normal"
      >
        {text}
      </Text>
    </Flex>
  );
}

export default IconPage;

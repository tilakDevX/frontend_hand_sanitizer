import React, { useState, useEffect } from "react";
import { Input, Link, Radio, Select } from "@chakra-ui/react";
import axios from "axios";
import {
  Box,
  Text,
  Flex,
  Heading,
  Image,
  Button,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

function Checkout(props) {
  const [cartItems, setCartItems] = useState([]);
  const [id, setId]  = useState("")
  const [flag, setFlag] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Calculate the cart total whenever the cart items change
    calculateCartTotal();
  }, [cartItems, quantity]);

 
  useEffect(() => {


    const buy = localStorage.getItem("buy");
    axios.get(`https://puce-magpie-tie.cyclic.app/products/${buy}`).then((res) => {
      console.log(res.data);
      setCartItems(res.data);
    });
  }, []);

  const calculateCartTotal = () => {
    let total = 0;
    for (const itemId in cartItems) {
      if (cartItems.hasOwnProperty(itemId)) {
        const item = cartItems[itemId];
        total += item.MRP * item.quantity;
      }
    }
    
  };

  const handleQuantity = (value) => {
    const newQuantity = Math.max(1, quantity + value);
    setQuantity(newQuantity);
  };

  const genrateId =()=>{

    const timestamp = Date.now(); // Current timestamp in milliseconds
    const randomNum = Math.floor(Math.random() * 10000); // Random number between 0 and 9999
    const orderID = `${timestamp}-${randomNum}`;
      setId(orderID)
    setFlag(true);
  }

  return (
    <Box border="2px solid gray" m="0.3rem" mt={"12rem"}>
      <Flex borderBottom={"2px solid gray"}>
        <Box w="40%" p="0.4rem" borderRight={"2px solid gray"}>
          <HamburgerIcon />
        </Box>
        <Flex w="60%" p="0.4rem" justifyContent={"space-between"}>
          <Text>CHECKOUT</Text>
          <CloseIcon />
        </Flex>
      </Flex>

      <Flex>
        {flag ? (
          <Box width={"40%"} borderRight={"2px solid gray"} p="6rem" mt={10}>
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
              <Link href='/' color={"red.400"}>Go To HomePage</Link>
              <Link href='/product' color={"green.800"}>Continue Shoping</Link>
            </Flex>
          </Box>
        ) : (
          <Box width={"40%"} borderRight={"2px solid gray"} p="5rem">
            <Heading width="100%" fontSize={"3rem"} mb="2rem">
              CHECKOUT
            </Heading>
            <Input variant="flushed" placeholder="First Name" />
            <Input variant="flushed" placeholder="Last Name" />
            <Input variant="flushed" placeholder="Phone Number" />
            <Flex>
              <Select variant="flushed" placeholder="Country">
                <option value="option1">India</option>
                <option value="option2">USA</option>
                <option value="option3">china</option>
              </Select>
              <Select variant="flushed" placeholder="City">
                <option value="option1">Delhi</option>
                <option value="option2">Mumbai</option>
                <option value="option3">Bangaluru</option>
              </Select>
            </Flex>
            <Input variant="flushed" placeholder="Address" />
            <Flex>
              <Input variant="flushed" placeholder="APL" />
              <Input variant="flushed" placeholder="Postal Code" />
            </Flex>
            <Text mt="0.8rem">Shipping Method</Text>
            <Stack mt="0.8rem">
              <Flex justifyContent={"space-between"}>
                <Radio>Standard(7-14 working days) </Radio> <Text>$14</Text>
              </Flex>
              <Flex justifyContent={"space-between"}>
                <Radio>Express(3-4 working days) </Radio> <Text>$40</Text>
              </Flex>
            </Stack>

            <Box>
              <Text mt="1rem">Payment</Text>
              <Input variant="flushed" placeholder="XXXXX XXXXX XXXXX XXXXX" />
              <Flex>
                <Input variant="flushed" placeholder="Month" />
                <Input variant="flushed" placeholder="Expiry" />
              </Flex>
              <Input variant="flushed" placeholder="CVV" />
            </Box>
            <Flex justifyContent={"end"}>
              <Button
                mt="0.8rem"
                _hover={"none"}
                bg="orange"
                color="white"
                onClick={ 
                  
                  genrateId
                 }
              >
                PAY
              </Button>
            </Flex>
          </Box>
        )}

        <Box width={"60%"}>
          {/* Render the cart items */}

          <Flex
            key={cartItems._id}
            justifyContent={"space-between"}
            borderBottom={"2px solid gray"}
          >
            <Image w="25%" src={cartItems.img} />
            <Flex
              minWidth={"70%"}
              justify={"space-around"}
              alignItems={"center"}
            >
              <Box>
                <Text>{cartItems.brand}</Text>
              </Box>
              <Flex align={"center"}>
                <Button
                  disabled={quantity === 1}
                  onClick={() => handleQuantity(-1)}
                >
                  -
                </Button>
                <Text ml="0.8rem" mr="0.8rem">
                  {quantity}
                </Text>
                <Button onClick={() => handleQuantity(1)}>+</Button>
              </Flex>

              {/* </Grid> */}
            </Flex>
          </Flex>

          <Flex
            p="1rem"
            justifyContent={"space-between"}
            ml="12.6rem"
            borderLeft={"2px solid gray"}
          >
            <Text w="6rem" fontSize={"0.7rem"}>
              Shopping calculated in count
            </Text>
            <Text fontSize={"0.7rem"}>Total</Text>
            <Text>€ {cartItems.MRP * quantity}</Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default Checkout;

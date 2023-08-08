import React, { useState, useEffect } from "react";
import {
  Divider,
  Input,
  Radio,
  Select,
  VStack,
  background,
} from "@chakra-ui/react";
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
  const [cartTotal, setCartTotal] = useState(0);
  const [flag, setFlag] = useState(false);


  useEffect(() => {
    // Calculate the cart total whenever the cart items change
    calculateCartTotal();
  }, [cartItems]);

  useEffect(() => {
    axios.get("https://sanitizer-5qvt.onrender.com/products").then((res) => {
      console.log(res.data);
      setCartItems(res.data.map((item) => ({ ...item, quantity: 1 })));
    });
  }, []);

  const calculateCartTotal = () => {
    let total = 0;
    for (const item of cartItems) {
      total += item.MRP * item.quantity; // Multiply price by quantity
    }
    setCartTotal(total);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity--;
      setCartItems(updatedCartItems);
    }
  };

  const handleIncreaseQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity++;
    setCartItems(updatedCartItems);
  };





  return (
    <Box border="2px solid gray" m="0.3rem" mt={50}>
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
            <Heading as='h1' size='2xl'>THANK YOU FOR ORDER</Heading>
            <Text mt="0.8rem">Your order number is 1234 you can track your order on your <span style={{color:"orange"}}>personal account</span> or continue shoping</Text>
            <Text mt="3rem" fontSize={"2rem"}  color="gray">FOLLOW US ON INSTAGRAM @thisiskmv</Text>
          </Box>
        ) : (
          <Box width={"40%"} borderRight={"2px solid gray"} p="5rem" >
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

            <Box >
              <Text mt="1rem">Payment</Text>
              <Input variant="flushed" placeholder="XXXXX XXXXX XXXXX XXXXX" />
              <Flex>
                <Input variant="flushed" placeholder="Month" />
                <Input variant="flushed" placeholder="Expiry" />
              </Flex>
              <Input variant="flushed" placeholder="CVV" />
            </Box>
            <Flex justifyContent={"end"}>
              <Button mt="0.8rem" _hover={"none"} bg="orange" color="white" onClick={()=>{setFlag(true)}}>
                PAY
              </Button>
            </Flex>
          </Box>
        )}

        <Box width={"60%"}>
          {/* Render the cart items */}
          {cartItems.slice(0,5).map((item, index) => (
            <Flex
              key={index}
              justifyContent={"space-between"}
              borderBottom={"2px solid gray"}
            >
              <Image w="25%" src={item.img} />
              <Flex
                minWidth={"70%"}
                justify={"space-around"}
                alignItems={"center"}
              >
                <Box>
                  <Text>{item.brand.slice(0, 22)}</Text>
                </Box>
                <Flex align={"center"}>
                  <Button onClick={() => handleDecreaseQuantity(index)}>
                    -
                  </Button>
                  <Text ml="0.8rem" mr="0.8rem">
                    {item.quantity}
                  </Text>
                  <Button onClick={() => handleIncreaseQuantity(index)}>
                    +
                  </Button>
                </Flex>
                <Box>
                  {" "}
                  <Text>€ {(item.MRP * item.quantity).toFixed(2)}</Text>
                </Box>
                {/* </Grid> */}
              </Flex>
            </Flex>
          ))}

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
            <Text>€ {cartTotal}</Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default Checkout;

import React, { useState } from "react";
import {
  Input,
  Radio,
  Select,
  Box,
  Text,
  Flex,
  Heading,
  Button,
  Stack,
} from "@chakra-ui/react";
import ThankYou from "./ThankYou";

function Checkout(props) {
  const [id, setId] = useState("");
  const [flag, setFlag] = useState(false);

  const generateId = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000);
    const orderID = `${timestamp}-${randomNum}`;
    setId(orderID);
    setFlag(true);
    console.log("click") ;
  };

  const handleSubmit = ()=>{
    event.preventDefault();
    generateId();
  }
  return (
    <Flex
      w={"50%"}
      p={"15px"}
      m={"auto"}
      mt={"12rem"}
      justifyContent={"center"}
      boxShadow={
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
      }
    >

      {
        flag ? <ThankYou id={id}/> 
        :
        (

        <Box>
          <Heading width="100%" fontSize={"3rem"} mb="2rem">
            CHECKOUT
          </Heading>
          <form onSubmit={handleSubmit}>
            <Flex justifyContent={"space-evenly"} gap={"40px"}>
              <Box>
                <Input
                  variant="flushed"
                  placeholder="First Name"
                  required
                  name="firstName"
                />
                <Input
                  variant="flushed"
                  placeholder="Last Name"
                  name="lastName"  required
                />
                <Input
                  variant="flushed"
                  placeholder="Phone Number"
                  name="phoneNumber" required
                />
                <Flex>
                  <Select variant="flushed" placeholder="Country" name="country" required>
                    <option value="option1">India</option>
                    <option value="option2">USA</option>
                    <option value="option3">China</option>
                  </Select>
                  <Select variant="flushed" placeholder="City" name="city" required>
                    <option value="option1">Delhi</option>
                    <option value="option2">Mumbai</option>
                    <option value="option3">Bangalore</option>
                  </Select>
                </Flex>
                <Input
                  variant="flushed"
                  placeholder="Address"
                  name="address"
                />
                
                <Text mt="0.8rem">Shipping Method</Text>
                <Stack mt="0.8rem">
                  <Flex justifyContent={"space-between"}>
                    <Radio name="shippingMethod">
                      Standard(7-14 working days)
                    </Radio>{" "}
                    <Text>$14</Text>
                  </Flex>
                  <Flex justifyContent={"space-between"}>
                    <Radio name="shippingMethod">
                      Express(3-4 working days)
                    </Radio>{" "}
                    <Text>$40</Text>
                  </Flex>
                </Stack>
              </Box>
              <Box>
                <Text mt="1rem">Payment</Text>
                <Input
                  variant="flushed"
                  placeholder="xxxx xxxx xxxx"
                  name="cardNumber" required
                />
                <Flex>
                  <Input variant="flushed" placeholder="Month" name="month" required/>
                  <Input variant="flushed" placeholder="Expiry" name="expiry" required/>
                </Flex>
                <Input variant="flushed" placeholder="CVV" name="cvv" required/>
                <Flex justifyContent={"end"}>
                  <Button
                    mt="0.8rem"
                    bg="orange"
                    color="white"
                    
                    type="submit"
                  >
                    PAY
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </form>
        </Box>
        )
      }
    </Flex>
  );
}

export default Checkout;

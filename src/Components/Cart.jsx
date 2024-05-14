import { AddIcon, CloseIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Image,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useMediaQuery,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token") || "";

const headers = {
  Authorization: `Bearer ${token}`,
};
let serverUrl = import.meta.env.VITE_SERVER_URL;
function Cart(props) {
  const [cart, setCart] = useState([]);
  const [spin, setSpinner] = useState(true);
  const [subTotal, setSubTotal] = useState(0);

  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const [isLargerThan820] = useMediaQuery("(max-width: 1050px)");
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const hanldeDeleteCart = (id) => {
    console.log(id);
    try {
      axios
        .delete(`${serverUrl}/user/cart/product/${id}`, {
          headers,
        })
        .then((res) => {
          console.log(res);
          GetCart();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const calculateSubTotal = (cartData) => {
    return cartData.reduce((acc, element) => acc + element.total, 0);
  };
  const GetCart = () => {
    try {
      axios
        .get(`${serverUrl}/user/cart/product`, {
          headers,
        })
        .then((res) => {
          console.log(res.data);

          const cartData = res.data;
          // Calculate subTotal
          let calculatedSubTotal = 0;
          if (cartData.length !== 0) {
            calculatedSubTotal = cartData.reduce(
              (acc, element) => acc + element.total,
              0
            );
          }

          // Update subTotal state
          setSubTotal(calculatedSubTotal.toFixed(2));
          setCart(cartData);
          setSpinner(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCount = (productId, value) => {
    // Create a copy of the cart array
    const updatedCart = [...cart];

    // Find the index of the product in the cart
    const productIndex = updatedCart.findIndex(
      (element) => element._id === productId
    );

    if (productIndex !== -1) {
      updatedCart[productIndex].quantity += value;

      updatedCart[productIndex].total =
        updatedCart[productIndex].quantity *
        updatedCart[productIndex].product.finalPrice;
    }
    const updatedSubTotal = calculateSubTotal(updatedCart);
    setSubTotal(updatedSubTotal.toFixed(2));

    setCart(updatedCart);
  };
  useEffect(() => {
    GetCart();
    // console.log(subTotal);
  }, []);

  return (
    <Flex
      m={"auto"}
      mt={"13rem"}
      justifyContent={"space-evenly"}
      alignItems="center"
      flexDir={isLargerThan820 ? "column" : "row"}
    >
      <Box
        width={isLargerThan820 ? "65%" : "45%"}
        mb={isLargerThan820 && "3rem"}
      >
        {spin && cart?.length===0 ? (
          <Center>
            {" "}
            <p>Cart is empty</p>
          </Center>
        ) : (
          <TableContainer>
            <Table colorScheme="#000">
              <Thead>
                <Tr>
                  <Th>PRODUCT</Th>
                  <Th>QUANTITY</Th>
                  <Th>TOTAL</Th>
                  <Th></Th>
                </Tr>
              </Thead>

              <Tbody>
                {cart.length > 0 &&
                  cart.map((element, index) => {
                    return (
                      <Tr key={index}>
                        <Td>
                          <Image width={"50px"} src={element.product.img} />
                          <Text>
                            {`${element.product.brand}`
                              .split(" ")
                              .slice(0, 4)
                              .join(" ")}
                          </Text>
                        </Td>
                        <Td>
                          <AddIcon
                            cursor={"pointer"}
                            onClick={() => {
                              handleCount(element._id, 1);
                            }}
                          />
                          {element.quantity}
                          <MinusIcon
                            style={{
                              pointerEvents:
                                element.quantity === 1 ? "none" : "auto",
                            }}
                            cursor={"pointer"}
                            onClick={() => {
                              if (element.quantity !== 1) {
                                handleCount(element._id, -1);
                              }
                            }}
                          />
                        </Td>
                        <Td>{element.total.toFixed(2)} €</Td>
                        <Td
                          cursor={"pointer"}
                          onClick={() => {
                            hanldeDeleteCart(element._id);
                          }}
                        >
                          <Button>
                            <CloseIcon />
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <Box width={isLargerThan820 ? "40%" : "20%"} height={"20vh"}>
        <Text fontSize={"12px"}>SPEND 8,60€ MORE TO RECEIVE FREE SHIPPING</Text>

        <Divider
          width={"100%"}
          borderWidth="3.5px"
          borderRadius={"10px"}
          opacity={1}
        />
        {spin && cart?.length==0 ? (
         <p>Cart is empty</p>
        ) : (
          <Text
            textAlign={"center"}
            mt={"5%"}
            fontSize={"20px"}
            fontWeight={"500"}
          >
            Subtotal: {subTotal} €
          </Text>
        )}
        <Center>
          <Box
            as={Button}
            w={"100%"}
            m={"auto"}
            mt={"8%"}
            bg={isHovered ? "#ffffff" : "black"}
            color={isHovered ? "black" : "#ffffff"}
            borderRadius={"40px"}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              alert(
                "Sorry! This feature not available yet. You can't checkout from here."
              );
              // navigate("/checkout");
            }}
          >
            Checkout
          </Box>
        </Center>
      </Box>
    </Flex>
  );
}

export default Cart;

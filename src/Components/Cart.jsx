import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
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
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const token = localStorage.getItem("token") || "";

const headers = {
  Authorization: `Bearer ${token}`,
};

function Cart(props) {
  const [cart, setCart] = useState([]);
  const [spin, setSpinner] = useState(true);

  const hanldeDeleteCart = (id) => {
    console.log(id);
    try {
      axios
        .delete(`https://puce-magpie-tie.cyclic.app/user/cart/product/${id}`, {
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
  const GetCart = () => {
    try {
      axios
        .get(`https://puce-magpie-tie.cyclic.app/user/cart/product`, {
          headers,
        })
        .then((res) => {
          console.log(res.data);
          setCart(res.data);
          setSpinner(false);
        });
    } catch (error) {
      console.log(error);
    }
    console.log(cart);
  };

  useEffect(() => {
    GetCart();
  }, []);

  return (
    <Flex m={"auto"} mt={"13rem"} justifyContent={"space-evenly"}>
      <Box width={"45%"}>
        {spin ? (
          <Center>
            {" "}
            <Spinner m={"4rem"} size="xl" />
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
                        <Td>1</Td>
                        <Td>1</Td>
                        <Td
                          cursor={"pointer"}
                          onClick={() => {
                            hanldeDeleteCart(element._id);
                          }}
                        >
                          <CloseIcon />
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <Box bg={"green"} width={"30%"} height={"20vh"}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem,
          sunt.
        </p>
      </Box>
    </Flex>
  );
}

export default Cart;

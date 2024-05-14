import { Box, Flex, Image, Text, Stack, Button } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

// Assuming you have defined serverUrl elsewhere
let serverUrl = import.meta.env.VITE_SERVER_URL;

let token = localStorage.getItem("token") || "";
export default function OrderedProduct() {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `${serverUrl}/user/ordered_product/get-ordered-list`,
          { headers }
        );
        console.log(response.data); // Assuming you want to log the response data
        setOrderList(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once after component mounts

  const handleCancelletion = async (id) => {
    console.log("id", id);

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.delete(
        `${serverUrl}/user/ordered_product/delete/${id}`,
        { headers }
      );
      console.log("res", res);
      window.location.reload()
    } catch (error) {
      console.log("Error while deleting the product form ordered list.", error);
    }
  };

  function generateRandomNumber() {
    return Math.floor(Math.random() * 5) + 2; // Generates random number between 2 and 6
  }
  return (
    <>
      <Text fontSize="2xl" mb={4}>
        Ordered Products
      </Text>
      <Box p={"15px"} m={"auto"} mt={"12rem"} width={"100%"}>
        {orderList.map((product) => (
          <Box
            key={product._id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            display={"flex"}
            justifyContent={"space-between"}
            gap={"50px"}
            p={"10px"}
          >
            <Box width={"100px"}>
              <Image src={product.img} alt={product.brand} />
            </Box>

            <Box d="flex" alignItems="baseline">
              <Text fontSize="xl" fontWeight="semibold" mr={2}>
                {product.brand}
              </Text>
            </Box>
            <Box mt="1" mb="2">
              <Text fontSize="lg" color="black">
                MRP: {product.MRP}€
              </Text>
              <Text fontSize="lg" color="green.600">
                Final Price: {product.finalPrice}€
              </Text>
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.500">
                Ordered Date: {new Date(product.orderedDate).toLocaleString()}
              </Text>
            </Box>
            <Box display={"flex"} flexDir={"column"}>
              <Text fontSize="sm" color="gray.500">
                Expected Delivery In {product?.expectedDeliveryDate} Days
              </Text>
              <Button
                onClick={() => {
                  handleCancelletion(product._id);
                }}
              >
                Cancel The Product
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}

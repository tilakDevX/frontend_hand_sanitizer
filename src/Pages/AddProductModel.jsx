

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

function AddProductModel(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = () => {
    const newProduct = {
      brand: productName,
      MRP: price,
      finalPrice: finalPrice,
      img: imageUrl,
    };

    // console.log(newProduct)
    const token = localStorage.getItem("token") || "";

    console.log(token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`https://puce-magpie-tie.cyclic.app/products/create`, newProduct,config)
      .then((response) => {
        console.log("Product added successfully:", response);
        onClose();
        // You might want to refresh the list of products after adding
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };
  return (
    <>
      <Button onClick={onOpen} color={"whiteAlpha.900"} bg="green">
        Add New Product
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader >Add Your Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Product Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Product Name"
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                placeholder="Price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Final Price</FormLabel>
              <Input
                placeholder="Final Price"
                onChange={(e) => {
                  setFinalPrice(e.target.value);
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image URL</FormLabel>
              <Input
                placeholder="URL"
                onChange={(e) => {
                  setImageUrl(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue" mr={3}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddProductModel;

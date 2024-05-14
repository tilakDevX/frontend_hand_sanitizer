import React, { useState } from "react";
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
let serverUrl = import.meta.env.VITE_SERVER_URL
function UpdateProduct({ product, setData, setUpdate }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    // console.log(product)

  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const handleSubmit = () => {

    const token = localStorage.getItem("token") || "";

     
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put(
        `${serverUrl}/products/edit/${product._id}`,
        editedProduct,config
      )
      .then((response) => {
        console.log("Product updated successfully:", response.data);
        setData((prevData) =>
          prevData.map((item) =>
            item._id === response.data._id ? response.data : item
          )
        );
        // Close the editing form or modal here if needed

        setUpdate({status:false, product:[]})
        onClose()
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };
  return (
    <>
      <Button onClick={onOpen} color={"whiteAlpha.900"} bg="green">
       Update Product
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Your Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Product Name</FormLabel>
              <Input
                ref={initialRef}
                name="brand"
                value={editedProduct.brand}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                name="MRP"
                value={editedProduct.MRP}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Final Price</FormLabel>
              <Input
                name="finalPrice"
                value={editedProduct.finalPrice}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image URL</FormLabel>
              <Input
                name="img"
                value={editedProduct.img}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue" mr={3}>
              Submit
            </Button>
            <Button onClick={()=>{
                setUpdate({status:false, product:[]})
                onClose()
            }}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateProduct;

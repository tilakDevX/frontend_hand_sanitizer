import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import React from "react";

function DeleteProduct({id,setData}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  


  const handleDelete = (id) => {
    const token = localStorage.getItem("token") || "";

    console.log(token);
    const config = {
        headers: {
          Authorization:`Bearer ${token}` ,
        },
      };

    try {
      axios
        .delete(
          `https://puce-magpie-tie.cyclic.app/products/delete/${id}`,
          config
        )
        .then((res) => {
          console.log(res);
          setData((prevData) => prevData.filter((item) => item._id !== id));
           
        });
    } catch (error) {
      console.log("Error while deleting product");
      console.log(error);
    }
  };

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Delete Product
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete This Product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red"  onClick={() => {
                          handleDelete(id);
                          onClose()
                        }} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default DeleteProduct;

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

function AccountDrawer(props) {
  let { isOpen, onOpen, onClose } = useDisclosure();
  let btnRef = React.useRef();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || "";

  return (
    <>
      <Button
        ref={btnRef}
        color={"black"}
        colorScheme={"transparent"}
        onClick={onOpen}
      >
        Your Account
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />

        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Account Details</DrawerHeader>

          <DrawerBody>
            {user === "" ? (
              <Button
                onClick={() => {
                  navigate("/login");
                  onClose(); // Close the drawer when the button is clicked
                }}
              >
                Login
              </Button>
            ) : (
              <Box>
                <Text>Name: {user.name}</Text>
                <Text>Email: {user.email}</Text>
                <Button
                onClick={() => {
                   localStorage.removeItem("user");
                    onClose(); // Close the drawer when the button is clicked
                }}
              >
                LogOut
              </Button>
              </Box>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default AccountDrawer;

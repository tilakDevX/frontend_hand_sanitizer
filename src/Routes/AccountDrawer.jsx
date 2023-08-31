import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
       <FontAwesomeIcon icon={faUser} fontSize={"20px"}/>
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
                    localStorage.removeItem("token");
                    onClose(); // Close the drawer when the button is clicked
                  }}
                >
                  LogOut
                </Button>
              </Box>
            )}

            <DrawerFooter>
              {user.role === "admin" && (
                <Button
                  onClick={() => {
                    navigate("/admin");
                    onClose();
                  }}
                  bgColor="#5B9A8B"
                >
                  Open Admin DashBoard
                </Button>
              )}
            </DrawerFooter>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default AccountDrawer;

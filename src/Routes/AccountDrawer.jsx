import {
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

function AccountDrawer(props) {
  let { isOpen, onOpen, onClose } = useDisclosure();
  let btnRef = React.useRef();

  return (
    <>
      <Button ref={btnRef} color={"black"} colorScheme={"transparent"} onClick={onOpen}>
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
          <DrawerHeader>Your Name</DrawerHeader>

          <DrawerBody>
            <Text>Your Email</Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default AccountDrawer;

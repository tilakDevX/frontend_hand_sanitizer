import React, { useContext } from "react";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Flex,
  Image,
  useMediaQuery,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Input,
  Text,
} from "@chakra-ui/react";

import {
  faBagShopping,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo_han.webp";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountDrawer from "./AccountDrawer";
import { MyContext } from "../Components/Context/MyContext";
import "../Components/CSS/navbar.css";

function NavHeader(props) {
  let [isMedia] = useMediaQuery("(max-width: 450px)");
  let [isLeft] = useMediaQuery("(max-width: 750px)");

  const { isMenuOpen, setIsMenuOpen } = useContext(MyContext);

  const toggleButton = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Announcement bar */}
      <Flex
        flexDir={isMedia && "column"}
        bg={"#c1ddc6"}
        p={"2.5px"}
        justifyContent={"center"}
        gap={isMedia ? "5px" : "50px"}
        textAlign={"center"}
      >
        <Link className="link">Free shipping over 35 €</Link>
        <Link className="link">Subscribe to our Newsletter</Link>
      </Flex>

      {/* nav header */}

      <Flex
        justifyContent={isLeft ? "space-between" : "space-between"}
        alignItems={"center"}
        padding={"30px"}
        pb={"0"}
      >
        {isLeft ? (
          <button className="toggleButton" onClick={toggleButton}>
            {isMenuOpen ? (
              <FontAwesomeIcon icon={faXmark} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </button>
        ) : (
          <Flex>
            {/* 1st menu */}
            <Popover>
              <PopoverTrigger>
                <Button
                  rightIcon={<ChevronDownIcon />}
                  border={"none"}
                  background="none"
                >
                  Countries
                </Button>
              </PopoverTrigger>
              <PopoverContent bg={"white"} p={"25px"} spacing={"5px"}>
                <PopoverArrow />
                <Flex gap="65px" mb={"10px"}>
                  <PopoverHeader fontWeight={"600"}>
                    SHIPPING COUNTRY
                  </PopoverHeader>
                  <PopoverCloseButton bg={"transparent"} border={"none"} />
                </Flex>
                <PopoverBody mb={"5px"}>European Union</PopoverBody>
                <PopoverBody mb={"5px"}>United Kingdom</PopoverBody>
                <PopoverBody mb={"5px"}>USA</PopoverBody>
                <PopoverBody mb={"5px"}>Canada</PopoverBody>
                <PopoverBody mb={"5px"}>Mexico</PopoverBody>
                <PopoverBody mb={"5px"}>Korea</PopoverBody>
                <PopoverBody mb={"5px"}>Thailand</PopoverBody>
              </PopoverContent>
            </Popover>

            {/* 2nd menu */}
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                border={"none"}
                background="none"
              >
                EN
              </MenuButton>

              <MenuList mb={"10px"}>
                <MenuItem border={"none"} bg={"white"}>
                  FR
                </MenuItem>
                <MenuItem border={"none"} bg={"white"}>
                  DE
                </MenuItem>
                <MenuItem border={"none"} bg={"white"}>
                  IT
                </MenuItem>
                <MenuItem border={"none"} bg={"white"}>
                  ES
                </MenuItem>
                <MenuItem border={"none"} bg={"white"}>
                  PT
                </MenuItem>
              </MenuList>
            </Menu>

            {/* User Account */}

            {/* <Link to="/login">
            <FontAwesomeIcon icon={faUser} color="black" />
          </Link> */}
          </Flex>
        )}

        {/* Logo */}
        <Link to={`/`}>
          <Image src={logo} color="black" width={isMedia ? "90px" : "150px"} />
        </Link>

        {/* Right side Search  and Account */}

        <Flex alignItems={"center"} >
          <Link to={"/cart"} ml={"15px"}>
            <FontAwesomeIcon icon={faBagShopping} color="black" fontSize={"20"} />
          </Link>
          <AccountDrawer />
        </Flex>
      </Flex>
    </>
  );
}

export default NavHeader;

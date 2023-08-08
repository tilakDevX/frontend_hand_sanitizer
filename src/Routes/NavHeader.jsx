import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@chakra-ui/react";

import {
  faBagShopping,
  faHeart,
  
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo_han.webp";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchContext } from "../Pages/SearchContext";

function NavHeader(props) {
  const navigate = useNavigate()
  let [isMedia] = useMediaQuery("(max-width: 450px)");
  let [isLeft] = useMediaQuery("(max-width: 750px)");


  const { handleSearchChange } = useContext(SearchContext);

  const onSearchChange = (e) => {
    handleSearchChange(e.target.value);
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
        justifyContent={isLeft ? "space-evenly" : "space-between"}
        alignItems={"center"}
        padding={"30px"}
        pb={"0"}
      >
        <Flex display={isLeft && "none"}>
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
            <PopoverContent bg={"white"} p={"25px"} spacing ={"5px"}>
              <PopoverArrow />
              <Flex gap="65px" mb={"10px"}>
                <PopoverHeader fontWeight={"600"} >SHIPPING COUNTRY</PopoverHeader>
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
              <MenuItem border={"none"} bg={"white"}>FR</MenuItem>
              <MenuItem border={"none"} bg={"white"}>DE</MenuItem>
              <MenuItem border={"none"} bg={"white"}>IT</MenuItem>
              <MenuItem border={"none"} bg={"white"}>ES</MenuItem>
              <MenuItem border={"none"} bg={"white"}>PT</MenuItem>
            </MenuList>
          </Menu>

          {/* User Account */}

          <Link to="/login">
            <FontAwesomeIcon icon={faUser} color="black" />
          </Link>
        </Flex>

        {/* Logo */}
        <Link to={`/`}>
          <Image src={logo} color="black" width={"150px"} />
        </Link>

        {/* Right side Search  and Account */}

        <Flex alignItems={"center"} gap="15px">
          <Input
            placeholder="Search..."
            border={"0"}
            borderBottom="1px solid black"
            _focus={{ outline: "none" }}
            display={isMedia && "none"}

            onChange={onSearchChange} 
          />
          {/* <FontAwesomeIcon icon={faMagnifyingGlass} color="black"/> */}
          <Link>
            <FontAwesomeIcon icon={faHeart} color="black" />
          </Link>

          <Link to={'/checkout'}>
            <FontAwesomeIcon icon={faBagShopping} color="black" />
          </Link>
        </Flex>
      </Flex>
    </>
  );
}

export default NavHeader;

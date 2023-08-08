// import { Menu, MenuList } from "@chakra-ui/react";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../Components/CSS/navbar.css";
import { Button, Flex, Menu, MenuButton, MenuList, Link } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import NavHeader from "./NavHeader";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";


function Navabar(props) {
  const Navigate = useNavigate()
  let [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleButton = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="header">
    <NavHeader />
      <header className={`navbar ${isMenuOpen ? "menuOpen" : ""}`}>
        <div className={`menuItems ${isMenuOpen ? "" : "open"}`}>
          {/* 1st menu */}


          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} className="btns">
              Shop
            </MenuButton>

            <MenuList className="list">
              <Flex flexDir={"column"} textAlign={"left"}>

              <h5>Skin Care</h5>
              <Link   href="#"   className="link"  onClick={()=>{Navigate(`/product`)}}>Face Cleanser</Link>
              <Link className="link" onClick={()=>{Navigate(`/product`)}}>Face Cream</Link>
              <Link className="link" onClick={()=>{Navigate(`/product`)}}>Face Serum</Link>
              <Link className="link" onClick={()=>{Navigate(`/product`)}}>Packs Skin Care</Link>
              </Flex>

            </MenuList>
          </Menu>


          {/* 2nd menu list */}


          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} className="btns">
            Collection
            </MenuButton>

            <MenuList className="list">
              <Flex flexDir={"column"} textAlign={"left"}>

              
              <Link className="link" >Travel</Link>
              <Link className="link">Sun Care</Link>
              <Link className="link">Sets</Link>
               
              </Flex>

            </MenuList>
          </Menu>

          {/* 3rd menu list */}


          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} className="btns">
            About Us
            </MenuButton>

            <MenuList className="list">
              <Flex flexDir={"column"} textAlign={"left"}>

              
              <Link className="link">Who We Are</Link>
              <Link className="link">Purpose</Link>
              <Link className="link">Affiliate</Link>
              <Link className="link">Contact</Link>
               
              </Flex>

            </MenuList>
          </Menu>

          {/* 4th link */}
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} className="btns">
            Sobremesa Talks
            </MenuButton>
      </Menu>

          {/* <Link className="link">Sobremesa Talks</Link> */}
        </div>

        <button className="toggleButton" onClick={toggleButton} >
          {isMenuOpen ? (
            <FontAwesomeIcon icon={faXmark} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </button>
      </header>
    </div>
  );
}

export default Navabar;

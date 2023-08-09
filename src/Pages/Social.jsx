import { Flex, Icon } from "@chakra-ui/react";
import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Social(props) {
  return (
    <Flex alignContent={"center"}>
      <Link href="#">
        <Icon as={FaInstagram} boxSize={25} margin={15} color={"black"} />
      </Link>
      <Link href="#">
        <Icon as={FaFacebookF} boxSize={25} margin={15} color={"black"} />
      </Link>
      <Link href="#">
        <Icon as={FaYoutube} boxSize={25} margin={15} color={"black"} />
      </Link>
      <Link href="#">
        <Icon as={FaLinkedin} boxSize={25} margin={15} color={"black"} />
      </Link>
    </Flex>
  );
}

export default Social;

import { Link } from "@chakra-ui/react";
import React from "react";

function Links({text}) {
  return (
    <Link
      href="#"
      color={"black"}
      textDecoration={"none"}
      _hover={{ textDecor: "underline" }}
      fontSize={"12px"}
    >
        {text}

    </Link>
  );
}

export default Links;

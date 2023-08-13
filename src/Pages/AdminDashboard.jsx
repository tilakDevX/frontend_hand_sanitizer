import { Button,  Flex, Heading } from "@chakra-ui/react";
import React from "react";
import ProductTable from "./ProductTable";
import AddProductModel from "./AddProductModel";

function AdminDashboard(props) {
  return (
    <>
      <Flex mt={"12rem"}mb ="1.5rem" justifyContent={"space-evenly"}>
        <Heading>Admin Dashborad</Heading>
        <AddProductModel />
      </Flex>

      <ProductTable />
    </>
  );
}

export default AdminDashboard;

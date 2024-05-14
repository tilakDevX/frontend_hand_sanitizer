import {
  Button,
  Center,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

import DeleteProduct from "./DeleteProduct";
import UpdateProduct from "./UpdateProduct";
let serverUrl = import.meta.env.VITE_SERVER_URL
function ProductTable(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProd, setTotalProd] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [update_item, setUpdate] = useState({ status: false, product: {} });
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const limit = 5;
  const fetchdata = async () => {
    let apiUrl = `${serverUrl}/products?sort=${sortOption}&_limit=${limit}&_page=${currentPage}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    // console.log(data.totalCount)
    setTotalProd(data.totalCount);
    setData(data.product);
    // console.log(data);
    setLoading(false);
  };

  const totalPages = Math.ceil(totalProd / limit);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  useEffect(() => {
    fetchdata();
  }, [currentPage, sortOption]);
  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Name of Product</Th>
              <Th>Price</Th>
              <Th>MRP</Th>
              <Th>Remove</Th>
              <Th>Modify</Th>
            </Tr>
          </Thead>

          <Tbody>
            {data.length > 0 &&
              data.map((element, index) => {
                return (
                  <Tr key={index}>
                    <Td>{element.brand}</Td>
                    <Td>{element.MRP}</Td>
                    <Td>{element.finalPrice}</Td>
                    <Td>
                      <DeleteProduct id={element._id} setData={setData} />
                    </Td>
                    <Td>
                      <Button
                        onClick={() => {
                          setUpdate({ status: true, product: element });
                        }}
                      >
                        Update
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
      {loading && (
        <Center>
          <Spinner size="xl" />
        </Center>
      )}

      {update_item.status && (
        <Center>
          <UpdateProduct
            product={update_item.product}
            setData={setData}
            setUpdate={setUpdate}
          />
        </Center>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </>
  );
}

export default ProductTable;

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Center,
  Flex,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Spinner,
  useToast,
} from "@chakra-ui/react";

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import debounce from "lodash/debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import Pagination from "./Pagination";
import { MyContext } from "../Components/Context/MyContext";
import axios from "axios";

const Product = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const limit = 8;

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProd, setTotalProd] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const { setcartStatus, cartStatus } = useContext(MyContext);
  // Use lodash's debounce to create a debounced version of the search function
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      setTotalProd(data.totalCount);
      setData(data.product);
      setLoading(false);
    } catch (error) {
      console.log("Error while fetching data:", error);
      setTotalProd(0);
      setData([]);
      setLoading(false);
    }
  };

  const debouncedSearch = debounce((value) => {
    console.log("searched value", value);
    const apiUrl = `https://puce-magpie-tie.cyclic.app/products?brand=${value}`;
    fetchData(apiUrl);
  }, 300);

  const fetchInitialData = () => {
    const apiUrl = `https://puce-magpie-tie.cyclic.app/products?sort=${sortOption}&_limit=${limit}&_page=${currentPage}`;
    fetchData(apiUrl);
  };

  const totalPages = Math.ceil(totalProd / limit);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearch(value);
    debouncedSearch(value);
  };

  const AddCart = (product) => {

   
    const token = localStorage.getItem("token") || "";

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      axios
        .post("https://puce-magpie-tie.cyclic.app/user/cart/add", product, {
          headers,
        })
        .then((res) => {
          console.log(res.data.message);
          setcartStatus("success");
          console.log(cartStatus);
        });
    } catch (error) {
      setcartStatus("error");
      console.error(error);
    }
    console.log(cartStatus);

  };
  useEffect(() => {
    fetchInitialData();
  }, [currentPage, sortOption, search]);
  return (
    <div>
      <div
        style={{
          display: "flex",
          marginTop: "200px",
          marginBottom: "40px",
          justifyContent: "space-evenly",
        }}
      >
        <Box width={"150px"}>
          <Select
            value={sortOption}
            onChange={handleSortChange}
            marginRight={4}
          >
            <option value="">Sort By</option>
            <option value="priceLowToHigh">LTH</option>
            <option value="priceHighToLow">RTH</option>
            <option value="name">Name</option>
          </Select>
        </Box>

        {/* <Select value={filterOption} onChange={handleFilterChange}>
          <option value="">Filter By</option>
          <option value="brand1">Face Cream</option>
          <option value="brand2">Brand 2</option>
        </Select> */}
        <Flex>
          <InputGroup w="80%">
            <Input
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
            />
            <InputLeftElement
              pointerEvents="none"
              children={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              ml="8px"
            />
          </InputGroup>
        </Flex>
      </div>
      <div>
        {loading && (
          <Center>
            {" "}
            <Spinner m={"4rem"} size="xl" />
          </Center>
        )}

        <Grid
          gridTemplateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
          ]} // Responsive grid
          gap={"20px"}
          m={"10px"}
        >
          {data.length > 0 &&
            data.map((Product, index) => {
              return (
                <Card
                  key={index}
                  maxW="xs"
                  id="card"
                  boxShadow={" rgba(0, 0, 0, 0.24) 0px 3px 8px"}
                >
                  <CardBody>
                    <Image
                      src={Product.img}
                      alt="Green double couch with wooden legs"
                      borderRadius="lg"
                    />
                    <Stack mt="6" spacing="3">
                      <Link to="#" style={{ textDecoration: "none" }}>
                        <Heading size="md">
                          <Text style={{ fontWeight: "500" }} className="hero">
                            {Product.brand}
                          </Text>
                        </Heading>
                      </Link>
                      <Text
                        color="blue.600"
                        fontSize="2xl"
                        textDecoration={"line-through"}
                        mt={-5}
                      >
                        {Product.MRP}€
                      </Text>
                      <Text color="blue.600" fontSize="2xl" mt={-7}>
                        {Product.finalPrice}€
                      </Text>
                    </Stack>
                  </CardBody>
                  <CardFooter>
                    <ButtonGroup spacing="20" m={"auto"}>
                      <Button
                        variant="solid"
                        colorScheme="blue"
                        onClick={() => {
                          navigate("/checkout");
                          localStorage.setItem("buy", Product._id);
                        }}
                      >
                        Buy Now
                      </Button>
                      <Button
                        variant="ghost"
                        colorScheme="blue"
                        onClick={() => {
                          // navigate("/checkout");

                          AddCart(Product);

                           setTimeout(()=>{
                            toast({
                              title: "Product added to cart",
                              status: `${cartStatus}`,
                              duration: 3000,
                              isClosable: true,
                            });
                           }, 2000)
                            
                             
                          
                        }}
                      >
                        <FontAwesomeIcon icon={faCartPlus} fontSize={"20px"} />
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              );
            })}
        </Grid>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Product;

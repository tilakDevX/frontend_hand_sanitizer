import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Center, Select, Spinner } from '@chakra-ui/react';

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import Pagination from './Pagination';

const Product = () => {
  const navigate = useNavigate();
  const limit = 8;

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProd, setTotalProd] = useState(null);
  const [sortOption, setSortOption] = useState(''); 
  const [filterOption, setFilterOption] = useState(''); 
  const [loading, setLoading] = useState(true)

  const fetchdata = async () => {
    let apiUrl = `https://puce-magpie-tie.cyclic.app/products?sort=${sortOption}&_limit=${limit}&_page=${currentPage}`;
    
    
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    setData(data);
    console.log(data.totalCount)
    setTotalProd(data.totalCount);
    setData(data.product);
    setLoading(false)
     
  };

  useEffect(() => {
    fetchdata();
  }, [currentPage, sortOption, filterOption]);

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

  return (
    <div>
      <div style={{display: "flex" ,marginTop: "180px"}}>
        <Select value={sortOption} onChange={handleSortChange} marginRight={4}>
          <option value=''>Sort By</option>
          <option value='priceLowToHigh'>Price (Low to High)</option>
          <option value='priceHighToLow'>Price (High to Low)</option>
          <option value='name'>Name</option>
        </Select>
        <Select value={filterOption} onChange={handleFilterChange}>
          <option value=''>Filter By</option>
          <option value='brand1'>Face Cream</option>
          <option value='brand2'>Brand 2</option>
        </Select>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          width: '80%',
          margin: 'auto',
        }}
      >
        {
          loading && <Center> <Spinner m={"4rem"} size='xl'/></Center>
        }

        {data.length>0 && data.map((Product, index) => {
          return (
            <Card key={index} maxW='sm' id='card'>
              <CardBody>
                <Image
                  src={Product.img}
                  alt='Green double couch with wooden legs'
                  borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                  <Link to='#' style={{ textDecoration: 'none' }}>
                    <Heading size='md' >
                      <Text style={{ fontWeight: '500' }} className='hero'>
                        {Product.brand}
                      </Text>
                    </Heading>
                  </Link>
                  <Text 
                    color='blue.600'
                    fontSize='2xl'
                    textDecoration={'line-through'}
                    mt={-5}
                  >
                    {Product.MRP}€
                  </Text>
                  <Text color='blue.600' fontSize='2xl' mt={-7}>
                    {Product.finalPrice}€
                  </Text>
                </Stack>
              </CardBody>
              <CardFooter ml={10} >
                <ButtonGroup spacing='2'>
                  <Button variant='solid' colorScheme='blue' onClick={()=>{navigate('/checkout');localStorage.setItem("buy", Product._id )}}>
                    Buy Now
                  </Button>
                  <Button variant='ghost' colorScheme='blue' onClick={()=>{navigate('/checkout');localStorage.setItem("cart",  Product._id )}}>
                    Add to cart
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          );
        })}
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
import React from 'react'
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

const Pagination = ({totalPages , currentPage , handlePageChange}) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index + 1}
              variant='solid'
              colorScheme={currentPage === index + 1 ? 'blue' : 'gray'}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      );
}

export default Pagination
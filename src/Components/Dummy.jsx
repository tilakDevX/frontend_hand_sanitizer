import React from 'react';

function Dummy(props) {
    return (
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
    );
}

export default Dummy;
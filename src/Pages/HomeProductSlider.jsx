import React, { useRef } from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import "../Components/CSS/homeProductSlider.css";
import { useNavigate } from "react-router-dom";

const HomeProductSlider = ({ products, isLoading }) => {
  const navigate = useNavigate();
  const productContainerRef = useRef(null);

  const btnPressPrev = () => {
    productContainerRef.current.scrollLeft -=
      productContainerRef.current.offsetWidth;
  };

  const btnPressNext = () => {
    productContainerRef.current.scrollLeft +=
      productContainerRef.current.offsetWidth;
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <div className="product-carousel">
      <Flex justifyContent={"space-between"} p={"0 2rem"}>
        <button className="pre-btn" onClick={btnPressPrev}>
          <p>&lt;</p>
        </button>
        <Text fontWeight={"500"}>Gift Sets</Text>
        <button className="next-btn" onClick={btnPressNext}>
          <p>&gt;</p>
        </button>
      </Flex>

      <div className="product-container" ref={productContainerRef} >
        {products.length > 0 &&
          products.map((element, index) => (
            <div key={index} className="product-item" onClick={()=>{navigate(`/product`)}}>
              <Image src={element.img} width={"98%"} pt={"10px"} />
              <Text
                fontWeight={"500"}
                style={{
                  color: "black", // Initial color
                  transition: "color 0.3s", // Transition duration for smooth effect
                  ":hover": {
                    color: "red", // Color on hover
                  },
                }}
              >
                {element.brand.split(" ").slice(0, 3).join(" ")}
              </Text>
              <Text>
                {element.MRP}
                {"€ "}
                <span className="crossed-line">{element.finalPrice}€</span>
              </Text>
              <button className="button">Add to cart</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomeProductSlider;

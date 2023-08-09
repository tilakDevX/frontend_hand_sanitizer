import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import "../Components/CSS/home.css";
import HomeProductSlider from "./HomeProductSlider";
import Feature from "./Feature";
import img1 from "../assets/ALALALA.webp";
import img2 from "../assets/Pack_completo_2.webp";
import img3 from "../assets/waterday_mobile-min.webp";
import IconPage from "./IconPage";
import icon1 from "../assets/natural-origin_2x_0a059206-b5c0-46fb-ada8-775ecdc3104f@2x.png";
import icon2 from "../assets/prebiotic_058b1fb9-42b6-458d-8877-0f37da788e0a@2x.png";
import icon3 from "../assets/fresh-scents_2x_b1477341-83a5-4a54-ad34-c4ce5e16324e@2x.png";
import icon4 from "../assets/group_3x_50d0fb7a-4fc8-4be3-9df9-5d7d99539f9e@2x.png";
import icon5 from "../assets/recyclable_2x_df5cfdc4-8365-4655-a4b3-daf979145779@2x.png";
import icon6 from "../assets/group_3x_81e5229c-087e-44d9-87fa-a8588fc3f21b.png";
import btmIcon1 from "../assets/btmIcon-1.png";
import btmIcon2 from "../assets/btmIcon-2.jpg";
import btmIcon3 from "../assets/btmIcon-3.jpg";
import btmIcon4 from "../assets/btmIcon-4.jpg";
import btmIcon5 from "../assets/bmtIcon-5.jpg";
import { SearchContext } from "./SearchContext";

function Home(props) {
  let [products, setProduct] = useState([]);
  let [isLoading, setLoading] = useState(true);
  const { searchQuery } = useContext(SearchContext);

  // https://sanitizer-5qvt.onrender.com/products
  useEffect(() => {


    axios
      .get(`https://puce-magpie-tie.cyclic.app/products`)
      .then((res) => {
        setProduct(res.data.product);
        console.log("geting product", res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Box className="home">
        <Flex w={"100%"} flexDir={"column"}>
          <Box className="title text-center" color={"white"}>
            <Heading
              fontSize={{ base: "35px", md: "60px" }}
              fontWeight={{ base: "600", md: "400" }}
              lineHeight={{ base: ".98", md: "1" }}
              letterSpacing={{ base: "-0.1px", md: "-0.1px" }}
              margin="0"
            >
              Buy Once, use for <br /> life
            </Heading>
            <Button
               
              m={"auto"}
              mt={"5%"}
              w={"50%"}
              bg={"black"}
              color={"white"}
            >
              Buy Now
            </Button>
          </Box>
        </Flex>
      </Box>

      <Flex
        bg={"#c1ddc6"}
        w={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        textAlign={"center"}
      >
        <Heading pr={"5px"} fontSize={"1rem"} fontWeight={"500"}>
          Lift Up your Journeys:{" "}
        </Heading>
        <Text> Natural essentials for your daily adventures</Text>
      </Flex>

      {/* Product Slider */}
      <HomeProductSlider
        products={products}
        searchQuery={searchQuery}
        isLoading={isLoading}
      />

      <Feature
        name="REFILLS"
        title="Design meets Sustainability"
        description="Refill and Reuse. Save up to 89% plastic by refilling your favorite products"
        btn="SHOP NOW"
        color="#ffd54e"
        image={img1}
        dir={false}
      />

      <Flex justifyContent={"center"} alignItems={"center"} m={"1rem 0 1rem 0"}>
        <IconPage text="Clean Ingredients" icon={icon1} isSingle={false} />
        <IconPage text="Prebiotic Complex" icon={icon2} isSingle={false} />
        <IconPage text="Fresh Scents" icon={icon3} isSingle={false} />
        <IconPage text="Ready to Refill" icon={icon4} isSingle={false} />
        <IconPage text="Recyclable" icon={icon5} isSingle={false} />
      </Flex>

      <Feature
        name="NEWSLETTER"
        title="Forget your fear of missing out"
        description="Sign up for our Newsletter and keep an eye on the news all day long"
        btn="SUBSCRIBE NOW"
        color="#a2b2c8"
        image={img2}
        dir={true}
      />

      <IconPage
        text="We support clean water projects"
        isSingle={true}
        icon={icon6}
        m={"1rem 0 1rem 0"}
      />
      <Feature
        name=""
        title="Our purpose"
        description="Our aim is to eradicate Water Crisis.
        We support clean water projects by creating water wells in developing countries."
        btn="DISCOVER MORE"
        color="#da8879"
        image={img3}
        dir={false}
      />

      <Flex flexDir={"column"} alignItems={"center"} mt={"1.5rem"}>
        <Flex>
          <IconPage text="" icon={btmIcon1} isSingle={false} />

          <IconPage text="" icon={btmIcon2} isSingle={false} />
          <IconPage text="" icon={btmIcon3} isSingle={false} />
          <IconPage text="" icon={btmIcon4} isSingle={false} />
          <IconPage text="" icon={btmIcon5} isSingle={false} />
        </Flex>
        <Text textAlign={"center"} width={"40%"}>
          “Never have hand sanitizers been so necessary in our lives. If they
          can be sustainable, beautiful and handy like HAAN Pockets are, it’s
          just a lovely plus.”
        </Text>

       
      </Flex>
    </div>
  );
}

export default Home;

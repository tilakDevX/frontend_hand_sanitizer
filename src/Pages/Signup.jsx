import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom"
import axios from "axios";
const SignUp = () => {


    const navigate=useNavigate()
  const [name, setFirstName] = useState("");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const [signup_status, setSignupStatus] = useState("");


  const postSignUp = (value)=>{
    try {
      axios.post(`http://localhost:8500/user/signup`, value).then((res)=>{
        console.log(res)
        setSignupStatus(res.data.message);

       
      })
    } catch (error) {
      alert("An error ocurred while signup");
      console.log("An error ocurred while signup")
      console.error(error)
      
    }
  }


  const handleSignUp = (e) => {
    e.preventDefault();
  
    if (!name   || !email || !password || !privacyAccepted) {
      alert("Please fill in all fields and accept the privacy policy.");
      return;
    }
  
    const user = {
      name,
       
      email,
      password
    };
    postSignUp(user)
  
    // Convert user object to JSON string
    const userJSON = JSON.stringify(user);
  
    console.log(user)
    // Store the user details in local storage
    localStorage.setItem("user", userJSON);
  

  
    // Reset the form fields
    setFirstName("");
     
    setEmail("");
    setPassword("");
    setPrivacyAccepted(false);
  };
  

  return (
    <Box mt={200}>
     <Center>
      <Heading as="h2" fontWeight="300" fontSize="20px" letterSpacing="-0.2px" mb={"5px"}>
        Register
      </Heading>
      </Center>
      <Center>
      <Text> Please fill in the information below</Text>
      </Center>
    
      <Center>
        <Stack spacing="4">
          <VStack as="header" spacing="6" mt="1"></VStack>
          <Card w="400px">
            <CardBody>
              <form onSubmit={handleSignUp}>
                <Stack spacing="4">
                  <FormControl marginBottom="10px">
                    <Input
                      type="text"
                      placeholder="Your Name"
                      w="100%"
                      bg="white"
                      borderColor="#d8dee4"
                      size="lg"
                      padding="10px"
                      borderRadius="30px"
                      value={name}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </FormControl>
                  
                  <FormControl marginBottom="10px">
                    <Input
                      type="text"
                      placeholder="E-mail"
                      w="100%"
                      bg="white"
                      borderColor="#d8dee4"
                      size="lg"
                      padding="10px"
                      borderRadius="30px"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                  <FormControl marginBottom="10px">
                    <Input
                      type="password"
                      placeholder="Password"
                      w="100%"
                      bg="white"
                      borderColor="#d8dee4"
                      size="lg"
                      padding="10px"
                      borderRadius="30px"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormControl>
                  <label>
                    <input
                      type="checkbox"
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    />
                    I have read and I accept the privacy policy
                  </label>
                  {
                    signup_status && <Text fontSize={"15px"} color={"green"}>{signup_status}</Text>
                  }
                  <br />
                  <Button
                    type="submit"
                    bg="black"
                    border="none"
                    color="white"
                   
                     
                    borderRadius="30px"
                    size="lg"
                    fontSize="15"
                    cursor="pointer"
                    _hover={{
                      bg: '#7F7F7F',
                      color: 'white',
                     transition: 'background-color 0.3s ease-in-out'
                    }}

                    
                  >
                    Create my Account
                  </Button>
                </Stack>
              </form>
            </CardBody>
          </Card>
        </Stack>
      </Center>
      <Center as="footer"  >
        <HStack spacing="4" mt="10px">
          <Link
            className="fp"
            isExternal
            color="#515151"
            to="/login"
            fontSize="s"
            onClick={()=>{navigate("/login")}}
          >
            Already registered? Log in!
          </Link>
        </HStack>
      </Center>
    </Box>
  );
};

export default SignUp;
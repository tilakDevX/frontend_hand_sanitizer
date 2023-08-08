import React from 'react';
import { Box, Heading, Text, Center, Flex, HStack, FormControl, Input, Button, Stack, VStack, Card, CardBody, Link } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Image1 from "../assets/facebook.png";
import Image2 from "../assets/twitter.png";
import Image3 from "../assets/google.png";
import Image4 from "../assets/amazon.png";
import {useNavigate} from "react-router-dom"


const Login1 = () => {
  // Define validation schema using Yup
  const navigate=useNavigate()
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('*Email is required'),
    password: Yup.string().required('*Password is required')
  });

  // Define initial form values
  const initialValues = {
    email: '',
    password: ''
  };

  // Handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    // Retrieve user details from local storage
    const storedUserJSON = localStorage.getItem('user');
    const storedUser = storedUserJSON ? JSON.parse(storedUserJSON) : null;

    if (storedUser && storedUser.email === values.email && storedUser.password === values.password) {
      alert('Login successful!');
      // Redirect to homepage
      window.location.href = '/';
    } else {
      alert('Invalid email or password');
    }

    // Reset the form
    setSubmitting(false);
  };

  return (
    <Box mt="200px">
        <Center mb="1rem">
        <Heading as="h2" fontWeight="300" fontSize="20px" letterSpacing="-0.2px">
        Login
      </Heading>
      </Center>
     <Center>
     
      <Text>Please enter your e-mail and password</Text>
     </Center>
     
      <Center>
        <Flex>
          <HStack spacing="20">
          <Center>
        <Flex>
          <HStack spacing="20"  >
            <button  className='Social'>
              <img width="40px" src={Image1} alt="" />
            </button>
            <button className='Social'>
              <img width="60px" src={Image2} alt="" />
            </button>
            <button className='Social'>
              <img width="40px" src={Image3} alt="" />
            </button>
            <button className='Social'>
              <img width="40px" src={Image4} alt="" />
            </button>
          </HStack>
        </Flex>
      </Center>
          </HStack>
        </Flex>
      </Center>
     
      <Center>
        <Stack spacing="4">
          <VStack as="header" spacing="6" mt="8"></VStack>
          <Card w="400px">
            <CardBody>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Stack spacing="4">
                      <FormControl marginBottom="10px">
                        <Field
                          type="text"
                          name="email"
                          placeholder="E-mail"
                          as={Input}
                          w="100%"
                          bg="white"
                          borderColor="#d8dee4"
                          size="lg"
                          padding="10px"
                          borderRadius="30px"
                        />
                        
                        <ErrorMessage name="email" component="div" color="#515151" />
                      </FormControl>
                      <FormControl marginBottom="10px">
                        <Field
                          type="password"
                          name="password"
                          placeholder="Password"
                          as={Input}
                          w="100%"
                          bg="white"
                          borderColor="#d8dee4"
                          size="lg"
                          padding="10px"
                          borderRadius="30px"
                        
                        />
                        <ErrorMessage name="password" component="div" color="#515151" />
                      </FormControl>
                      <HStack justifyContent="end">
                        <Button
                          className="fp"
                          as="a"
                          href="#"
                          variant="link"
                          size="xs"
                          fontWeight="500"
                          fontSize="15"
                          display="flex"
                          alignItems="end"
                          color="#515151"
                        >
                          Forgot password?
                        </Button>
                      </HStack>
                  
                      <Button
                        className="login"
                        type="submit"
                        bg="#161616"
                        color="white"
                        width="105%"
                        padding="10px"
                        borderRadius="30px"
                        size="lg"
                        fontSize="15"
                        isLoading={isSubmitting}
                        _hover={{
                          bg: '#7F7F7F',
                          color: 'white',
                         transition: 'background-color 0.3s ease-in-out'
                        }}
                      >
                        Log in
                      </Button>
                    </Stack>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        

          <Card variant="outline" borderColor="#d0d7de">
            <CardBody>
              <HStack fontSize="sm">
                <Link isExternal color="#0969da" href="#">
                  Manage subscriptions.
                </Link>
              </HStack>
            </CardBody>
          </Card>
        </Stack>
      </Center>
     
  
      <Center as="footer" mt="16">
        <HStack spacing="4" pt="2">
          <Link onClick={()=>navigate("/signup")}  className="fp" isExternal color="#515151"  fontSize="xs">
            Don't have an account?
          </Link>
        </HStack>
      </Center>
    </Box>
  );
};

export default Login1;
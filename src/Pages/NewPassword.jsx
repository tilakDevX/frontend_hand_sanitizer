import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Center,
  FormControl,
  Input,
  Button,
  Stack,
  VStack,
  Card,
  CardBody,
  Spinner,
 
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
let serverUrl = import.meta.env.VITE_SERVER_URL

const NewPassword = () => {
  
  const navigate = useNavigate();
  
  const [spinner, setSpinner] = useState(false);
 
  const [login_status, setLoginStatus] = useState("");
  const [Color, setColor] = useState(false);
   
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("*Email is required"),
    password: Yup.string().required("*Password is required"),
    newpassword: Yup.string().required("*Confirm Password is required"),
  });

   
  const initialValues = {
    email: "",
    password: "",
    newpassword: "",
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const newPassword = values.password;  
      const confirmNewPassword = values.newpassword;  
      const email = values.email;  

      
      if (newPassword !== confirmNewPassword) {

        console.log("New password and confirm new password do not match");
        
        setLoginStatus("Password do not match.")
        setColor(false)
        return; 
      }

      
      const response = await axios.post(
        `${serverUrl}/user/newpassword`,
        {
          email,
          password: newPassword,
        }
      );

     
      if (response.data.message === "Password updated successfully.") {

        setLoginStatus("Password updated successfully.")
        setSpinner(true)
        setColor(true)
         
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        console.log("Password updated:", response.data.message);
      }
      showStatus(true)
    } catch (error) {
        
        showStatus(true)
      console.log("An error occurred:", error);
     
    }

   
    
    setSubmitting(false);
  };

  return (
    <Box mt="200px">
      <Center>
         
        <Stack spacing="4">
          <VStack as="header" spacing="6" mt="8"></VStack>
          <Card
            w="400px"
            boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
            p={"10px"}
            borderRadius={"8px"}
          >
            <CardBody>
              <Heading
                as="h1"
                fontWeight="600"
                fontSize="20px"
                letterSpacing="-0.2px"
              >
                New Your New Password
              </Heading>
              <Text m={"10px"}>Please enter your e-mail and new password</Text>
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

                        <ErrorMessage
                          name="email"
                          component="div"
                          color="#515151"
                        />
                      </FormControl>
                      <FormControl marginBottom="10px">
                        <Field
                          type="password"
                          name="password"
                          placeholder="New Password"
                          as={Input}
                          w="100%"
                          bg="white"
                          borderColor="#d8dee4"
                          size="lg"
                          padding="10px"
                          borderRadius="30px"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          color="#515151"
                        />
                      </FormControl>
                      <FormControl marginBottom="10px">
                        <Field
                          type="password"
                          name="newpassword"
                          placeholder="Confirm Password"
                          as={Input}
                          w="100%"
                          bg="white"
                          borderColor="#d8dee4"
                          size="lg"
                          padding="10px"
                          borderRadius="30px"
                        />
                        <ErrorMessage
                          name="newpassword"
                          component="div"
                          color="#515151"
                        />
                      </FormControl>
                      {login_status && (
                         <Text
                         fontSize={"15px"}
                         color={Color ? "green" : "red"}
                       >
                         {login_status  }
                       </Text>
                        )}
                      {spinner ? (
                        <Center>
                          <Spinner />
                        </Center>
                      ) : (
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
                            bg: "#7F7F7F",
                            color: "white",
                            transition: "background-color 0.3s ease-in-out",
                          }}
                        >
                          Set New Password
                        </Button>
                      )}
                    </Stack>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Stack>
      </Center>
    </Box>
  );
};

export default NewPassword;

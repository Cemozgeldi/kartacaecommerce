import React from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import validations from "./validation";
import axios from "axios";
import { useAuth } from "../../../contexts/Auth.Context";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const fetchLogIn = async (input) => {
    const { data } = await axios.post(
      "http://localhost:4000/auth/login",
      input
    );
    return data;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validations,
    onSubmit: async (values, bag) => {
      try {
        const logInResponse = await fetchLogIn({
          email: values.email,
          password: values.password,
        });
        login(logInResponse);
        navigate("/profile");
        console.log(logInResponse);
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    },
  });

  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Sign In</Heading>
          </Box>
          <Box my={5}>
            {formik.errors.general && (
              <Alert status="error">{formik.errors.general}</Alert>
            )}
          </Box>
          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  placeholder="Enter email"
                  isInvalid={formik.touched.email && formik.errors.email}
                />
              </FormControl>

              <FormControl mt="4">
                <FormLabel>Password</FormLabel>
                <Input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  isInvalid={formik.touched.password && formik.errors.password}
                />
              </FormControl>
              <Button mt="4" width="full" type="submit">
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
};

export default Signin;

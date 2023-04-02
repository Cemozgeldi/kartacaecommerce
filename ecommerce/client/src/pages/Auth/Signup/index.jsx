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

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const fetchRegister = async (input) => {
    const { data } = await axios.post(
      "http://localhost:4000/auth/register",
      input
    );
    return data;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validations,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetchRegister({
          email: values.email,
          password: values.password,
        });
        login(registerResponse);
        navigate("/profile");
        console.log(registerResponse);
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
            <Heading>Sign Up</Heading>
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
              <FormControl mt="4">
                <FormLabel>Password Confirm</FormLabel>
                <Input
                  type="password"
                  name="passwordConfirm"
                  placeholder="Enter password again"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                  isInvalid={
                    formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm
                  }
                />
              </FormControl>
              <Button mt="4" width="full" type="submit">
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
};

export default Signup;

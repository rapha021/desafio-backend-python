import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { api } from "../../services/axios"
import { Form } from "./style"
import { useBoolean } from "@chakra-ui/react"
import { useGlobal } from "../../context/GlobalContext"
import { Link, Navigate } from "react-router-dom"

const Login = () => {
  const [password, setPassword] = useBoolean()
  const [error, setError] = useBoolean()
  const [loading, setLoading] = useBoolean()

  const { navigate, setAuthenticated } = useGlobal()

  const handleLogin = async (e: any) => {
    e.preventDefault()
    setLoading.on()
    const username = e.target[0].value
    const password = e.target[1].value
    await api
      .post("/api/user/login/", { username, password })
      .then((res) => {
        window.localStorage.setItem("token", res.data.access)
        setLoading.off()
        setError.off()
        setAuthenticated.on()
      })
      .catch((err) => {
        setLoading.off()
        setError.on()
        setAuthenticated.off()
      })
  }

  return (
    <>
      <Flex w="300px" h="300px">
        <Form onSubmit={handleLogin}>
          <FormControl isRequired isInvalid={error}>
            <FormLabel>Seu username:</FormLabel>
            <Input type="text" placeholder="Digite aqui!" />
          </FormControl>

          <FormControl isRequired isInvalid={error}>
            <FormLabel>Sua Senha:</FormLabel>
            <InputGroup>
              <Input
                type={password ? "text" : "password"}
                placeholder="Digite aqui!"
              />
              <InputRightElement w="90px">
                <Button size="sm" onClick={setPassword.toggle}>
                  {password ? "Esconder" : "Mostrar"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {error && (
              <FormErrorMessage>Username ou senha invalidos</FormErrorMessage>
            )}
          </FormControl>

          <Flex w="100%" justifyContent="space-between">
            <Text fontWeight="light">Não tem uma conta ainda?</Text>
            <Link to="/register">
              <Button variant="link">Cadastre-se</Button>
            </Link>
          </Flex>

          <Button type="submit" isLoading={loading} w="100%">
            Login
          </Button>
        </Form>
      </Flex>
    </>
  )
}

export default Login

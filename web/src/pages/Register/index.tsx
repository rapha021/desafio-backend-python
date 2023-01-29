import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useBoolean,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useGlobal } from "../../context/GlobalContext"
import { api } from "../../services/axios"
import { Form } from "../Login/style"

export const Register = () => {
  const [password, setPassword] = useState<string>()
  const [sPassword, setSPassword] = useState<string>()
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useBoolean()

  const { navigate, toast } = useGlobal()

  useEffect(() => {
    password !== sPassword ? setError(true) : setError(false)
  }, [password, sPassword])

  const handleRegister = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading.on()
    if (!error) {
      await api
        .post("/api/user/", {
          username: e.target.username.value,
          email: e.target.email.value,
          password: e.target.password.value,
        })
        .then((res) => {
          setLoading.off()
          toast({
            title: "Sucesso!",
            description: "Cadastro realizado com sucesso!",
            status: "success",
            duration: 5000,
            isClosable: true,
            variant: "left-accent",
            position: "top-left",
          })
          navigate("/login")
        })
        .catch((err) => {
          setLoading.off()
          toast({
            title: "Algo deu errado!",
            description: "Tente novamente mais tarde.",
            status: "error",
            duration: 5000,
            isClosable: true,
            variant: "left-accent",
            position: "top-left",
          })
        })
    }
  }

  return (
    <>
      <Flex w="300px">
        <Form onSubmit={handleRegister}>
          <FormControl isRequired>
            <FormLabel>Seu username:</FormLabel>
            <Input type="text" id="username" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Seu email:</FormLabel>
            <Input type="email" id="email" />
          </FormControl>

          <FormControl isRequired isInvalid={error}>
            <FormLabel>Sua senha:</FormLabel>
            <Input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormErrorMessage>Senhas não conferem</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={error}>
            <FormLabel>Repita a senha:</FormLabel>
            <Input
              type="password"
              onChange={(e) => setSPassword(e.target.value)}
            />
            <FormErrorMessage>Senhas não conferem</FormErrorMessage>
          </FormControl>

          <Flex w="100%" justifyContent="space-between">
            <Text fontWeight="light">Já tem conta?</Text>
            <Link to="/login">
              <Button variant="link">Ir para login</Button>
            </Link>
          </Flex>

          <Button type="submit" w="100%" isLoading={loading}>
            Cadastrar
          </Button>
        </Form>
      </Flex>
    </>
  )
}

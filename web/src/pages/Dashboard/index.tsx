import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react"
import { ChangeEvent, useState } from "react"
import { api } from "../../services/axios"

const Dashboard = () => {
  const [file, setFile] = useState<File>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async () => {
    setIsLoading(true)

    const formData = new FormData()

    formData.append("cnab", file!, "cnab")

    await api
      .post("/api/transaction/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setIsLoading(false)
        console.log(res)
      })
      .catch((err) => {
        setIsLoading(false)
      })
  }

  return (
    <Flex color="black" w="500px" flexDir="column" alignItems="center">
      <Heading size="lg">Formulário para envio do CNAB</Heading>
      <form
        onSubmit={async (e) => {
          e.preventDefault()

          await handleSubmit()
        }}
      >
        <FormControl isRequired={false}>
          <FormLabel>Arquivo CNAB:</FormLabel>
          <Input
            type="file"
            border="none"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.files) {
                setFile(e.target.files[0])
                console.log(e.target.files[0])
              }
            }}
          />
        </FormControl>

        <Button type="submit" isLoading={isLoading}>
          Enviar
        </Button>
      </form>
    </Flex>
  )
}

export default Dashboard

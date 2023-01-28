import { Flex, Heading } from "@chakra-ui/react"
import { Status } from "../../components/status"

import { TableCUI } from "../../components/table"

const Dashboard = () => {
  return (
    <Flex
      color="black"
      w="100%"
      flexDir="column"
      alignItems="center"
      maxW="1500px"
    >
      <Flex
        flexDir="column"
        alignItems="center"
        w="95%"
        h="430px"
        justifyContent="space-between"
      >
        <TableCUI />
      </Flex>

      <Flex flexDir="column" gap="30px" mt="35px" w="80%" alignItems="center">
        <Heading size="md">Suas Lojas:</Heading>
        <Status />
      </Flex>
    </Flex>
  )
}

export default Dashboard

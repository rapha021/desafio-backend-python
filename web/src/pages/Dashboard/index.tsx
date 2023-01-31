import { Flex, Heading, SlideFade } from "@chakra-ui/react"
import { Profile } from "../../components/profile"
import { Status } from "../../components/status"

import { TableCUI } from "../../components/table"
import { useGlobal } from "../../context/GlobalContext"

const Dashboard = () => {
  const { tab } = useGlobal()
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
        <Heading size="md">
          {tab === "store" ? "Suas Lojas:" : "Seu Perfil"}
        </Heading>
        <SlideFade in={tab === "store"}>
          {tab === "store" && <Status />}
        </SlideFade>

        <SlideFade in={tab === "profile"}>
          {tab === "profile" && <Profile />}
        </SlideFade>
      </Flex>
    </Flex>
  )
}

export default Dashboard

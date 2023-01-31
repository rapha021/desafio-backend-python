import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
  Avatar,
  Flex,
} from "@chakra-ui/react"

export const Profile = () => {
  const username = window.localStorage.getItem("username")
  const email = window.localStorage.getItem("email")
  return (
    <Card>
      <CardHeader>
        <Flex alignItems="center" gap="10px">
          <Avatar name={username!} src="" />
          <Box>
            <Heading size="md">{username}</Heading>
            <Text>{email}</Text>
          </Box>
        </Flex>
      </CardHeader>
    </Card>
  )
}

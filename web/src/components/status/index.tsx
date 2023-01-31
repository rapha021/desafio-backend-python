import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Text,
} from "@chakra-ui/react"
import { useGlobal } from "../../context/GlobalContext"

export const Status = () => {
  const { stores } = useGlobal()
  return (
    <>
      <StatGroup justifyContent="center" gap="10px">
        {stores.map((store) => (
          <Stat w="170px" key={store.id}>
            <StatLabel>{store.name}</StatLabel>
            <StatNumber fontSize="14px" fontWeight="semibold"></StatNumber>
            <StatHelpText>
              <StatArrow type={store.balance > 1 ? "increase" : "decrease"} />
              {store.balance.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </StatHelpText>
          </Stat>
        ))}
      </StatGroup>
    </>
  )
}

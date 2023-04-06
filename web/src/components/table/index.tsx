import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Center,
  Flex,
  IconButton,
} from "@chakra-ui/react";

import { useGlobal } from "../../context/GlobalContext";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { ModalCUI } from "../modal";
import { ProfileMenu } from "../menu";

export const TableCUI = () => {
  const {
    transactions,
    page,

    handle_next_page,
    handle_previous_page,

    onOpen,
  } = useGlobal();

  return (
    <>
      <TableContainer w="80%">
        <Table variant="striped" size="md">
          <TableCaption>Suas transações</TableCaption>
          <Thead>
            <Tr>
              <Th>Tipo</Th>
              <Th>Data e Hora</Th>
              <Th isNumeric>Valor</Th>
              <Th>CPF</Th>
              <Th>Cartão</Th>
              <Th>Loja</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.length > 0 ? (
              transactions.map((t) => {
                return (
                  <Tr key={t.id}>
                    <Td>{t.type}</Td>
                    <Td>{`${t.date} - ${t.hour}`}</Td>
                    <Td isNumeric>
                      {t.value.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Td>
                    <Td>{t.cpf}</Td>
                    <Td>{t.card}</Td>
                    <Td>{t.store.name}</Td>
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <Td>Sem dados</Td>
                <Td>Sem dados</Td>
                <Td isNumeric>Sem dados</Td>
                <Td>Sem dados</Td>
                <Td>Sem dados</Td>
                <Td>Sem dados</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex w="80%" alignItems="center" justifyContent="space-between">
        <Center gap="15px">
          <Button colorScheme="whatsapp" onClick={onOpen}>
            Enviar Arquivo
          </Button>
          <ProfileMenu />
          <Button
            colorScheme="gray"
            as="a"
            href="../../assets/cnab.txt"
            download
          >
            Baixar CNAB exemplo
          </Button>
        </Center>

        <Center gap="15px">
          <IconButton
            aria-label="página anterior"
            icon={<ChevronLeftIcon />}
            onClick={handle_previous_page}
          />
          <p>{page}</p>
          <IconButton
            aria-label="proxima página"
            icon={<ChevronRightIcon />}
            onClick={handle_next_page}
          />
        </Center>
      </Flex>
      <ModalCUI />
    </>
  );
};

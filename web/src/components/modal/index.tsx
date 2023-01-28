import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react"
import { useGlobal } from "../../context/GlobalContext"

export const ModalCUI = () => {
  const { isOpen, onOpen, onClose, handleSubmit, isLoading, setFile } =
    useGlobal()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enviar CNAB</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Arquivo CNAB:</FormLabel>
              <Input
                type="file"
                border="none"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files) {
                    setFile(e.target.files[0])
                  }
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter gap="10px">
            <Button onClick={onClose} colorScheme="red" variant="ghost">
              Cancelar
            </Button>
            <Button
              type="submit"
              colorScheme="whatsapp"
              variant="ghost"
              isLoading={isLoading}
            >
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}

import { SettingsIcon } from "@chakra-ui/icons"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react"
import { useGlobal } from "../../context/GlobalContext"

export const ProfileMenu = () => {
  const { setAuthenticated, tab, setTab } = useGlobal()

  const handleLogOut = () => {
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("username")
    window.localStorage.removeItem("email")

    setAuthenticated.off()
  }

  const handleTab = (type: string) => {
    if (type === "store") {
      setTab("store")
    }
    if (type === "profile") {
      setTab("profile")
    }
  }

  return (
    <Menu>
      <MenuButton as={Button} colorScheme="green" rightIcon={<SettingsIcon />}>
        Opções
      </MenuButton>
      <MenuList>
        <MenuGroup title="Sua conta">
          <MenuItem onClick={() => handleTab("profile")}>Meu perfil</MenuItem>
          <MenuItem onClick={handleLogOut}>Sair</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Gerenciamento">
          <MenuItem onClick={() => handleTab("store")}>Minhas Lojas</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}

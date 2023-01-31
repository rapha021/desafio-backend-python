import { useBoolean, useDisclosure, useToast } from "@chakra-ui/react"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { api } from "../services/axios"

interface IGlobal {
  authenticated: boolean
  setAuthenticated: {
    on: () => void
    off: () => void
    toggle: () => void
  }
  navigate: NavigateFunction
  transactions: ITransactions[]
  page: number
  maxPage: number
  handle_next_page: () => void
  handle_previous_page: () => void
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  handleSubmit: () => void
  isLoading: boolean
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>
  stores: IStore[]
  toast: any
  tab: string
  setTab: React.Dispatch<React.SetStateAction<string>>
}

interface IGlobalProviderProps {
  children: ReactNode
}

interface IUserInfo {
  username: string
  email: string
}

interface ITransactions {
  id: number
  type: string
  date: string
  value: number
  cpf: string
  card: string
  hour: string
  store: IStore
}

interface IStore {
  id: number
  name: string
  balance: number
  owner_name: string
}

export const GlobalContext = createContext<IGlobal>({} as IGlobal)

const GlobalProvider = ({ children }: IGlobalProviderProps) => {
  const [authenticated, setAuthenticated] = useBoolean()
  const [transactions, setTransactions] = useState<ITransactions[]>(
    [] as ITransactions[]
  )
  const [stores, setStores] = useState<IStore[]>([] as IStore[])

  const [token, setToken] = useState<string>()
  const [page, setPage] = useState<number>(1)
  const [maxPage, setMaxPage] = useState<number>(1)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [file, setFile] = useState<File>()

  const [tab, setTab] = useState<string>("store")

  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    const token = window.localStorage.getItem("token")
    token && setToken(token)
    api
      .get<IUserInfo>("/api/user/info/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        window.localStorage.setItem("username", res.data.username)
        window.localStorage.setItem("email", res.data.email)
        setAuthenticated.on()
        navigate("/dashboard")
      })
      .catch((err) => {
        window.localStorage.removeItem("username")
        window.localStorage.removeItem("email")
        window.localStorage.removeItem("token")
        setAuthenticated.off()
        navigate("/login")
      })
  }, [authenticated])

  useEffect(() => {
    if (authenticated) {
      api
        .get(`/api/transactions/?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTransactions(res.data.results)
          setMaxPage(res.data.count)
        })

      api
        .get("/api/store/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setStores(res.data.results)
        })
    }
  }, [page, token, isLoading, authenticated])

  const handle_next_page = () => {
    if (page < maxPage / 5) {
      setPage(page + 1)
    }
  }

  const handle_previous_page = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    const formData = new FormData()

    formData.append("cnab", file!, "cnab")

    await api
      .post("/api/transaction/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setIsLoading(false)
        onClose()
        toast({
          title: "Upload realizado!",
          description: "Em alguns instantes a tabela será atualizada.",
          status: "success",
          duration: 5000,
          isClosable: true,
          variant: "left-accent",
          position: "bottom-left",
        })
      })
      .catch((err) => {
        setIsLoading(false)
      })
  }

  return (
    <GlobalContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        navigate,
        transactions,
        page,
        maxPage,
        handle_next_page,
        handle_previous_page,
        isOpen,
        onOpen,
        onClose,
        handleSubmit,
        isLoading,
        setFile,
        stores,
        toast,
        tab,
        setTab,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobal = () => useContext(GlobalContext)

export default GlobalProvider

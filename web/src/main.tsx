import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react"
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import GlobalProvider from "./context/GlobalContext"
import "./index.css"

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

// const theme = extendTheme({
//   config,
//   styles: {
//     global: {
//       div: {
//         color: "RGBA(255, 255, 255, 0.92)",
//       },
//     },
//   },
// })

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>
)

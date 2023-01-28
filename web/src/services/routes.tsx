import { Navigate, Route, Routes } from "react-router-dom"
import { useGlobal } from "../context/GlobalContext"
import Dashboard from "../pages/Dashboard"
import Login from "../pages/Login"

export const RouterMain = () => {
  const { authenticated } = useGlobal()

  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

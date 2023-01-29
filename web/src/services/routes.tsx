import { Navigate, Route, Routes } from "react-router-dom"
import { useGlobal } from "../context/GlobalContext"
import Dashboard from "../pages/Dashboard"
import Login from "../pages/Login"
import { Register } from "../pages/Register"

export const RouterMain = () => {
  const { authenticated } = useGlobal()

  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  )
}

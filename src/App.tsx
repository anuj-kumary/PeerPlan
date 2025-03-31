import UserDetailsPage from "./pages/connection/UserDetailsPage"
import { Routes, Route } from "react-router-dom"

export function App() {
  return (
    <Routes>
      <Route path="/user/:userId" element={<UserDetailsPage />} />
    </Routes>
  )
}

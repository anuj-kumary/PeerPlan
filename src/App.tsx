import { Toaster } from "react-hot-toast"
import AppRoutes from "./AppRoutes"

export function App() {
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false}
        />
        <AppRoutes />
      </div>

    </>
  )
}

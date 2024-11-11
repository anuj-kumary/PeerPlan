import { Navbar } from "./components/Navbar";
import AppRoutes from "./AppRoutes"

export function App() {
  return (
    <>
      <Navbar />
      <div className="pt-14">
        <AppRoutes />
      </div>

    </>
  )
}

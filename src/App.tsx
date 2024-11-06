import { Navbar } from "./components/Navbar";
import AppRoutes from "./AppRoutes"

export function App() {
  return (
    <>
      <Navbar />
        <div className=" mt-14 flex z-0">
          <AppRoutes />
        </div>
    </>
  )
}

import { useState } from "react";
import { Navbar } from "./components/Navbar";
import AppRoutes from "./AppRoutes"
import { Loader } from "./components/Loader";

export function App() {
  const [user, setUser] = useState(null)

  // useEffect(() => {
  //   const checkUser = async () => {g
  //     try {
  //       const userData = await getUser()
  //       setUser(userData)
  //     } catch (error) {
  //       setUser(null)
  //     }
  //   }

  //   checkUser()
  // }, [])
  return (
    <>
      <Navbar />
        <div className=" mt-14 flex justify-center z-0">
          <AppRoutes />
        </div>
    </>
  )
}

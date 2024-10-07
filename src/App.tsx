import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { getUser } from "./rest/auth";
import AppRoutes from "./AppRoutes"

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
  console.log(user, "user")
  return (
    <>
      <Navbar />
        <div className=" mt-14 flex justify-center z-0">
          <AppRoutes />
        </div>
    </>
  )
}

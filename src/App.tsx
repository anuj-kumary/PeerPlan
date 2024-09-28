import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { getUser, loginWithGoogle } from "./rest/auth";

export function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await getUser()
        setUser(userData)
      } catch (error) {
        setUser(null)
      }
    }

    checkUser()
  }, [])
  console.log(user, "user")
  return (
    <>
      <Navbar />
      <div className="mt-14 -z-10 bg-white">
        <button onClick={loginWithGoogle}>Login with Google</button>
      </div>

    </>
  )
}

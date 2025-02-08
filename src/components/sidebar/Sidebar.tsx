import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "../../rest/auth";

export const Sidebar = () => {
  const { pathname } = useLocation();

  const handleLogout = async () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    await logoutUser();
  };

  return (
    <aside className="bg-white shadow-lg hidden md:flex md:flex-col w-64  text-black flex-col">
      <div className="flex-grow">
        <ul className="mt-4">
          <li
            className={`px-4 mb-2 text-lg py-2 transition duration-200 ease-in-out  cursor-pointer hover:bg-gray-200`}
          >
            <Link to="/dashboard" className="block">
              Peerplan
            </Link>
          </li>
          <li
            className={`px-4 mb-2 py-2 transition duration-200 ease-in-out  cursor-pointer ${
              pathname.includes("dashboard")
                ? "bg-[#3b58ff] text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <Link to="/dashboard" className="block">
              Home
            </Link>
          </li>
          <li
            className={`px-4 mb-2 py-2 transition duration-200 ease-in-out  cursor-pointer ${
              pathname.includes("connection")
                ? "bg-[#3b58ff] text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <Link to="/connection" className="block">
              Connection
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col mt-auto">
        <ul>
          <>
            <li
              className={`px-4 mb-2 py-2 transition duration-200 ease-in-out  cursor-pointer ${
                pathname.includes("profile")
                  ? "bg-[#3b58ff] text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              <Link to="/profile" className="block">
                Profile
              </Link>
            </li>
            <button
              onClick={handleLogout}
              className={`px-4 mb-2 py-2 transition duration-200 ease-in-out  cursor-pointer ${"hover:bg-gray-200"}`}
            >
              Logout
            </button>
          </>
        </ul>
      </div>
    </aside>
  );
};

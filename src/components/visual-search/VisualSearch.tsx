import { useState } from "react";

const usersData = [
  { id: 1, name: "John Doe", role: "Frontend Developer", language: "JavaScript" },
  { id: 2, name: "Jane Smith", role: "Backend Developer", language: "Python" },
  { id: 3, name: "Alice Johnson", role: "Full Stack Developer", language: "Java" },
  { id: 4, name: "Bob Brown", role: "DevOps Engineer", language: "Go" },
];

export const SearchFilter =() => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = usersData.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full p-4 bg-white-100">
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Search by name, role, or language..."
        className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchTerm.length > 0 && (
        <ul className="space-y-2">
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <li key={user.id} className="p-4 bg-gray-50 border rounded-md">
                <h3 className="font-bold">{user.name}</h3>
                <p className="text-sm">{user.role} - {user.language}</p>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">No results found</p>
          )}
        </ul>
      )}
    </div>
  </div>
  );
}

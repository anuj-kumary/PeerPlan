import { useEffect, useState } from "react";
import { Card } from "../../components/card";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { SearchFilter } from "../../components/visual-search/VisualSearch";
import { appwriteService } from "../../server/api/function/appwrite";
// const cardData = [
//   {
//     id: 1,
//     name: "Bonnie Green",
//     role: "Visual Designer",
//     image:
//       "https://img.freepik.com/premium-photo/ai-human-avatar-characters-male-model_1166271-38.jpg",
//   },
//   {
//     id: 2,
//     name: "John Doe",
//     role: "Software Engineer",
//     image:
//       "https://img.freepik.com/premium-photo/ai-human-avatar-characters-male-model_1166271-38.jpg",
//   },
//   {
//     id: 3,
//     name: "Jane Smith",
//     role: "Project Manager",
//     image:
//       "https://img.freepik.com/premium-photo/ai-human-avatar-characters-male-model_1166271-38.jpg",
//   },
//   {
//     id: 4,
//     name: "Mark Johnson",
//     role: "UI/UX Designer",
//     image:
//       "https://img.freepik.com/premium-photo/ai-human-avatar-characters-male-model_1166271-38.jpg",
//   },
//   {
//     id: 5,
//     name: "Mark Johnson",
//     role: "UI/UX Designer",
//     image:
//       "https://img.freepik.com/premium-photo/ai-human-avatar-characters-male-model_1166271-38.jpg",
//   },
// ];

type User = {
  $id: string;
  name: string;
  registration: string;
  status: boolean;
  labels: string[];
  passwordUpdate: string;
  email: string;
  phone: string;
  emailVerification: boolean;
  phoneVerification: boolean;
};

type ApiResponse = {
  total: number;
  users: User[];
};

function ConnectionPage() {
  const [users, setUser] = useState<ApiResponse>();
  const getUserList = async () => {

    const response = await appwriteService.getUsersList();

    if (typeof response !== "object" || !("users" in response)) {
      console.error("Invalid response structure:", response);
      return;
    }
    const formattedResponse: ApiResponse = {
      total: response.total,
      users: response.users.map((user) => ({
        ...user,
        prefs: {
          github: user.prefs.github || "",
          linkedin: user.prefs.linkedin || "",
          twitter: user.prefs.twitter || "",
        },
      })),
    };
    setUser(formattedResponse);
  };

  console.log(users, "users");

  useEffect(() => {
    getUserList();
  }, []);
  return (
    <div className="flex bg-white min-h-screen w-full">
      <Sidebar />
      <div className="flex bg-white flex-col w-full">
        <SearchFilter />
        <div className="m-4">
          <div className="grid sm:grid-cols-4 gap-8 max-sm:justify-center mt-12 max-sm:max-w-xs mx-auto">
            {users?.users.map((user) => (
              <Card
                key={user.$id}
                name={user.name}
                // role={card.role}
                image={"https://img.freepik.com/premium-photo/ai-human-avatar-characters-male-model_1166271-38.jpg"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectionPage;

import { useEffect } from 'react';
import { Card } from '../../components/card'
import { Sidebar } from '../../components/sidebar/Sidebar';
import { SearchFilter } from '../../components/visual-search/VisualSearch';
// @ts-expect-error will fix later
import { appwriteService } from "../../server/api/function/appwrite.js"
const cardData = [
  { id: 1, name: "Bonnie Green", role: "Visual Designer", image: "https://img.freepik.com/premium-photo/ai-human-avatar-characters-male-model_1166271-38.jpg" },
  { id: 2, name: "John Doe", role: "Software Engineer", image: "https://img.freepik.com/premium-photo/ai-human-avatar-characters-male-model_1166271-38.jpg" },
  { id: 3, name: "Jane Smith", role: "Project Manager", image: "https://img.freepik.com/premium-photo/ai-human-avatar-characters-male-model_1166271-38.jpg" },
  { id: 4, name: "Mark Johnson", role: "UI/UX Designer", image: "https://img.freepik.com/premium-photo/ai-human-avatar-characters-male-model_1166271-38.jpg" },
  { id: 5, name: "Mark Johnson", role: "UI/UX Designer", image: "https://img.freepik.com/premium-photo/ai-human-avatar-characters-male-model_1166271-38.jpg" }
];

function ConnectionPage() {
  const getUserList = async () => {
    await appwriteService.getUsersCount()
  }
  useEffect(() => {
    getUserList()
  }, [])
  return (
    <div className="flex bg-white min-h-screen w-full">
      <Sidebar />
      <div className='flex bg-white flex-col w-full'>
        <SearchFilter />
        <div className='m-4'>
          <div className="grid sm:grid-cols-4 gap-8 max-sm:justify-center mt-12 max-sm:max-w-xs mx-auto">
            {cardData.map((card) => (
              <Card key={card.id} name={card.name} role={card.role} image={card.image} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConnectionPage

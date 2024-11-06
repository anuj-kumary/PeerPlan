import { Card } from '../../components/card'
import { Sidebar } from '../../components/sidebar/Sidebar';

const cardData = [
  { id: 1, name: "Bonnie Green", role: "Visual Designer", image: "https://img.freepik.com/premium-photo/ai-human-avatar-characters-male-model_1166271-38.jpg" },
  { id: 2, name: "John Doe", role: "Software Engineer", image: "https://img.freepik.com/premium-photo/ai-human-avatar-characters-male-model_1166271-38.jpg" },
  { id: 3, name: "Jane Smith", role: "Project Manager", image: "https://img.freepik.com/premium-photo/ai-human-avatar-characters-male-model_1166271-38.jpg" },
  { id: 4, name: "Mark Johnson", role: "UI/UX Designer", image: "https://img.freepik.com/premium-photo/ai-human-avatar-characters-male-model_1166271-38.jpg" }
];

function ConnectionPage() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="grid flex-grow grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {cardData.map((card) => (
          <Card key={card.id} name={card.name} role={card.role} image={card.image} />
        ))}
      </div>
    </div>
  )
}

export default ConnectionPage

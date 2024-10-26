import { Card } from '../../components/card'

const cardData = [
    { id: 1, name: "Bonnie Green", role: "Visual Designer", image: "/docs/images/people/profile-picture-3.jpg" },
    { id: 2, name: "John Doe", role: "Software Engineer", image: "/docs/images/people/profile-picture-1.jpg" },
    { id: 3, name: "Jane Smith", role: "Project Manager", image: "/docs/images/people/profile-picture-2.jpg" },
    { id: 4, name: "Mark Johnson", role: "UI/UX Designer", image: "/docs/images/people/profile-picture-4.jpg" }
  ];

function ConnectionPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
    {cardData.map((card) => (
      <Card key={card.id} name={card.name} role={card.role} image={card.image} />
    ))}
  </div>
  )
}

export default ConnectionPage

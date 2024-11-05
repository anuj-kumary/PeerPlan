import { Content } from "../../components/sidebar/Content";
import { Sidebar } from "../../components/sidebar/Sidebar";


const DashboardPage = () => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <Content />
    </div>
  );
};

export default DashboardPage;

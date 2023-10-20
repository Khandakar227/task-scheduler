import DashBoard from "../components/DashBoard";
import Login from "../components/Login";
import { useAdmin } from "../contexts/AdminContext";

export default function Home() {
    const { admin, loading } = useAdmin();
    if (loading) return (<><p className="text-center">Loading...</p></>);
    if(!admin?.name) 
    return (
    <Login />
  )
  return (
    <DashBoard />
  )
}

import { useEffect, useState } from "react"
import { Link } from "react-router"
import { profile } from "../lib/api"

const Dashboard = () => {
  
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await profile();
        setUser(data.user);
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-4">
      <Link to="/login" className="p-4 bg-sky-950 font-semibold text-white rounded-2xl">login</Link>
      <Link to="/signup" className="p-4 bg-sky-950 font-semibold text-white rounded-2xl">signup</Link>
      <p>{user.email}</p>
      <p>{user.role}</p>
    </div>
  )
}

export default Dashboard
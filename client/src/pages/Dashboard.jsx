import { Link } from "react-router"

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-4">
      <Link to="/login" className="p-4 bg-sky-950 font-semibold text-white rounded-2xl">login</Link>
      <Link to="/signup" className="p-4 bg-sky-950 font-semibold text-white rounded-2xl">signup</Link>
    </div>
  )
}

export default Dashboard
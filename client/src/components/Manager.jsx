import { useNavigate } from 'react-router'
import { logout } from '../lib/api'
const Manager = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  }
  
  return (
    <div>
      <p>Manager</p>
      <button className="border cursor-pointer" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Manager
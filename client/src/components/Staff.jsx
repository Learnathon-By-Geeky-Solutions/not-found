import { useNavigate } from 'react-router'
import { logout } from '../lib/api'
const Staff = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  }
  
  return (
    <div>
      <p>Staff</p>
      <button className="border cursor-pointer" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Staff
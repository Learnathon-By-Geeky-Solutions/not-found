import { useNavigate } from 'react-router'
import { logout } from '../lib/api'
const Tenant = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  }
  
  return (
    <div>
      <p>Tenant</p>
      <button className="border cursor-pointer" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Tenant
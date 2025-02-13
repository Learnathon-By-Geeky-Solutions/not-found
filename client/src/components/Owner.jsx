import PropTypes from "prop-types"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router"
import { getUsers, logout } from "../lib/api";
import { RoleTitle } from "../config/Role";

const Owner = ({email, name}) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUsers();
        setUsers(data.users);
      } catch(error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  }
  return (
    <div className="flex flex-col items-center mt-8">
      <p>{name}</p>
      <p>{email}</p>
      <button className="border cursor-pointer" onClick={handleLogout}>Logout</button>
      <div>
        <h2>Manage user role</h2>
        { users.map(user => (<div key={user._id}>
          <p className="p-2 my-2">{user.name}    Role: {RoleTitle[user.role]}  <Link to={`/user/${user._id}`} className="border">Change Role</Link></p>
          </div>))}
      </div>
    </div>
  )
}

Owner.propTypes = {
  //_id: PropTypes.string,
  email: PropTypes.string,
  name: PropTypes.string,
}

export default Owner
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { RoleTitle } from "../config/Role"
import { getUser, updateRole } from "../lib/api";
const User = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState([]);
      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await getUser(id);
            setUser(data.user);
          } catch(error) {
            console.log(error);
            navigate("/login");
          }
        }
        fetchData();
      }, []);
    const [role, setRole] = useState(user.role);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await updateRole(id, {roleTitle: role});
          navigate("/");
        } catch (error) {
          console.log(error);
          navigate('/');
        }

    }
    return (
    <div>
        <p>Name: {user.name}</p>
        <p>Role: {RoleTitle[user.role]}</p>
        <h2>Change Role</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="roles">Select a role:</label>
          <select name="roles" id="roles" value={role} onChange={(e)=> setRole(e.target.value)}>
            <option>-- Choose a Role --</option>
            <option value="tenant">Tenant</option>
            <option value="owner">Owner</option>
            <option value="manager">Manager</option>
            <option value="staff">Staff</option>
          </select>
          <br/>
          <input type="submit" value="Submit" />
        </form>
    </div>
    )
}

export default User
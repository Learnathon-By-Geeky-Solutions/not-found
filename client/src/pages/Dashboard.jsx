import { useEffect, useState } from "react"
import { replace, useNavigate,  } from "react-router"
import { profile } from "../lib/api"
import Unassigned from "../components/Unassigned"
import Tenant from "../components/Tenant"
import Owner from "../components/Owner"
import Manager from "../components/Manager"
import Staff from "../components/Staff"

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await profile();
        setUser(data.user);
      } catch {
        navigate("/login", replace);
      }
    }
    fetchData();
  }, []);

  if(user.role === "67a842c7973d729e15c1dadb") return <Unassigned  {...user}/>
  if(user.role === "67a842c7973d729e15c1dade") return <Tenant  user={user}/>
  if(user.role === "67a842c8973d729e15c1dae1") return <Owner  {...user}/>
  if(user.role === "67a842c8973d729e15c1dae4") return <Manager  user={user}/>
  if(user.role === "67a842c8973d729e15c1dae7") return <Staff  user={user}/>
}

export default Dashboard
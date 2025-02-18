import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router'
import { getUnassignedRole, signup } from "../lib/api";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [unassignedRole, setUnassignedRole] = useState("");
    useEffect(() => {
        const fetchUnassignedRole = async () => {
          try {
            const { data } = await getUnassignedRole();
            setUnassignedRole(data.unassignedRole._id);
          } catch (error) {
            console.log(error.response.data.message);
          }
        }
        fetchUnassignedRole();
      }, []);

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await signup({name, email, password, confirmPassword, nid_picture: "Dummy", role: unassignedRole});
            if(response && response.data.success) {
                setEmail("");
                setPassword("");
                navigate('/login');
            }
        } catch (error) {
            console.log(error.response.data.errors);
        }
    }
  
  
    return (
    <div className="flex flex-col items-center pt-8">
        <h1 className="text-3xl font-bold">Log in to your account</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 my-8 bg-amber-200 px-10 py-8">
            <div className="flex flex-col space-y-2">
                <label htmlFor="name" className="font-semibold">Name</label>
                <input type="text" id="name" name="name" className="px-4 py-2 bg-white rounded" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="font-semibold">Email</label>
                <input type="email" id="email" name="email" className="px-4 py-2 bg-white rounded" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            
            <div className="flex flex-col space-y-2">
                <label htmlFor="password" className="font-semibold">Password</label>
                <input type="password" id="password" name="password" className="px-4 py-2 bg-white rounded" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="confirmPassword" className="font-semibold">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" className="px-4 py-2 bg-white rounded" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>

            <div><p>Already have an account?</p> <Link to="/login" className="font-semibold text-red-400">Login</Link></div>
            <button type="submit"  className="cursor-pointer border border-black py-2 rounded bg-red-400 mt-4">Submit</button>
        </form>
    </div>
  )
}

export default Signup
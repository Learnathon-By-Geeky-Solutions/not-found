import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:4004/api/v1/auth/login", {email, password}, {withCredentials: true});
            console.log(response);
            if(response && response.data.success) {
                setEmail("");
                setPassword("");
                navigate('/');
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
                <label htmlFor="email" className="font-semibold">Email</label>
                <input type="email" id="email" name="email" className="px-4 py-2 bg-white rounded" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            
            <div className="flex flex-col space-y-2">
                <label htmlFor="password" className="font-semibold">Password</label>
                <input type="password" id="password" name="password" className="px-4 py-2 bg-white rounded" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <button type="submit"  className="cursor-pointer border border-black py-2 rounded bg-red-400 mt-4">Submit</button>
        </form>
    </div>
  )
}

export default Login
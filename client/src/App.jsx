import { Routes, Route } from 'react-router'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import VerifyEmail from './pages/VerifyEmail'
import User from './pages/User'
function App() {

  return (
    <Routes>
      <Route path="/" element={<Dashboard />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/email/verify/:code" element={<VerifyEmail />}/>
      <Route path="/user/:id" element={<User />}/>
    </Routes>
  )
}

export default App

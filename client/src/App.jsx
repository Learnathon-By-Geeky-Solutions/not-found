import { Routes, Route } from 'react-router'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
function App() {

  return (
    <Routes>
      <Route path="/" element={<Dashboard />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
    </Routes>
  )
}

export default App

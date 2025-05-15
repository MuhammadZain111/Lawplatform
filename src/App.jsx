import { Routes, Route } from "react-router-dom"
import Home from "./screens/Home.jsx"
import About from "./screens/About.jsx"
import Services from "./screens/Services.jsx"
import LawyerDashboard from "./screens/LawyerDashboard.jsx"
import Login from "./screens/Login.jsx"
import RegisterLawyer from "./screens/RegisterLawyer.jsx"
import LawyerProfile from "./screens/LawyerProfile.jsx"
import LawyersList from "./screens/LawyersList.jsx"
import NoPage from "./screens/NoPage.jsx"
import "./App.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/lawyers" element={<LawyersList />} />
      <Route path="/lawyers/:id" element={<LawyerProfile />} />
      <Route path="/lawyer/dashboard" element={<LawyerDashboard />} />
      <Route path="/lawyer/profile" element={<LawyerProfile />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<RegisterLawyer />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  )
}

export default App

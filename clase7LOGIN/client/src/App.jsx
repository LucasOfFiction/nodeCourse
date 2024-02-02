import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/registerPage"
import LoginPage from "./pages/LoginPage"

function App(){

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1 className="text-4xl font-bold">Home Page</h1>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/tasks" element={<h1>tasks</h1>}/>
        <Route path="/add-tasks" element={<h1>add task</h1>}/>
        <Route path="/tasks/:id" element={<h1>task</h1>}/>
        <Route path="/Profile" element={<h1>Profile</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
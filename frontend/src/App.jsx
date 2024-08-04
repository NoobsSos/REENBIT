import Main from "./pages/Main/Main"
import LoginForm from "./pages/Login/Login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
function App() {

  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>

  )
}

export default App

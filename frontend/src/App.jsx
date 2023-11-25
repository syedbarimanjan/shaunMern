import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"

function App() {
  return (
  <div>
    <BrowserRouter>
      <Navbar/>
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  </div>
  )
}

export default App

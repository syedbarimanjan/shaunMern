import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext.jsx";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"

function App() {
  const {authState}=useAuthContext();
  return (
  <div>
    <BrowserRouter>
      <Navbar/>
      <div className="pages">
        <Routes>
          <Route path="/" element={authState.user ? <Home/> : <Navigate to="/login"/>}/>
          <Route path="/login" element={!authState.user ? <Login/> : <Navigate to="/"/> }/>
          <Route path="/signup" element={!authState.user ? <Signup/> : <Navigate to="/"/> }/>
        </Routes>
      </div>
    </BrowserRouter>
  </div>
  )
}

export default App

import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
  <div>
    <BrowserRouter>
      <Navbar/>
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  </div>
  )
}

export default App

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Compte from './pages/Compte/Compte'
import Error from './pages/Error/Error'

function App() {
  return (
    <div>
      <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/compte" element={<Compte />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}

export default App;

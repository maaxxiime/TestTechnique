import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Compte from './pages/Compte/Compte'
import Error from './pages/Error/Error'

const MainDiv = styled.div`

h2,
h3 {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

h1,
h5 {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

a,
button,
label,
input {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
`


function App() {
  return (
    <MainDiv>
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
    </MainDiv>
  );
}

export default App;


// @media screen and (max-width: 480px){}
//   @media screen and (min-width: 480px) and (max-width: 720px){}
//   @media screen and (min-width: 720px) and (max-width: 900px){}
//   @media screen and (min-width: 900px) and (max-width: 1024px){}
//   @media screen and (min-width: 1024px) and (max-width: 1200px){}
//   @media screen and (min-width: 1200px){}
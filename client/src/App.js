import { Routes, Route } from "react-router-dom";
import MainNavbar from "./components/shared/MainNavbar";
import Footer from "./components/shared/Footer";
import Home from './components/shared/Home';
import Courses from "./components/courses/Courses";
import Users from "./components/users/Users";
import Nomatch from "./components/shared/Nomatch";

const App = () => (
  <>
    <MainNavbar />
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/courses' element={ <Courses /> } />
      <Route path='/users' element={ <Users /> } />
      <Route path='*' element={ <Nomatch /> } />
    </Routes>
    <Footer />
  </>
)

export default App;

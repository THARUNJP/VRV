import './App.css';
import Read from './components/Read';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddRole from './components/AddRole';


function App() {
  return (
    <>
     <Router>
        <Routes>
          <Route path='/VRV/' element={<Login />} />
          <Route path='/userData' element={<Read />} />
          <Route path='/addRole' element={<AddRole/>} />
        
        </Routes>
      </Router>

    </>
  );
}

export default App;

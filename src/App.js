import logo from './logo.svg';
import './App.css';
import {Routes , Route} from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Pay from './Pages/Pay/Pay';
import Resolve from './Pages/Resolvecard/Resolve';
import Verify from './Pages/Verify/Verify';

function App() {
  return (
    <div className="App">
            <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/pay' element={<Pay/>}/>
      <Route path='/resolve' element={<Resolve/>}/>


      <Route path='/verify' element={<Verify/>}/>





        
      </Routes>
      





      

    </div>
  );
}

export default App;

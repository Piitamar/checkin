import { HashRouter, Route, Routes } from 'react-router-dom'
import Mainpage from './pages/Mainpage.jsx'
import Nav from './components/Nav.jsx'
import {useState, useEffect} from 'react';
import Calendar from './features/Calendar/Calendar.jsx';

export default function App()  {
    //------Dark mode
    const MODE = {
      LIGHT: 'light',
      DARK: 'dark'
    };

    const [mode, setMode] = useState(MODE.LIGHT);

    const toggle = () => {
      setMode(prevMode => (prevMode === MODE.LIGHT ? MODE.DARK : MODE.LIGHT));
    }

    useEffect(() => {
    if (mode == MODE.DARK) {
      document.body.style.backgroundImage = "linear-gradient(to top,#d4cad2 5%,#33374e 100%)"
      document.body.style.color = "white";
    } 
    if (mode == MODE.LIGHT) {
      document.body.style.backgroundColor = "#f0f2f4"; 
      document.body.style.backgroundImage = "none";
      document.body.style.color = "#495977";
    }
  });
 
  //--------MAIN----------------------------------------------------
  return (
    <HashRouter>
      <Nav mode={mode} toggle={() => toggle()} />

      <div className="App">
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path='/Calendar' element={<Calendar />} />
        </Routes>
      </div>

    </HashRouter>
  )
}

import { HashRouter, Route, Routes } from 'react-router-dom'
import Mainpage from './pages/Mainpage.jsx'
import Nav from './components/Nav.jsx'
import { useState, useEffect } from 'react';
import Calendar from './features/Calendar/Calendar.jsx';
import Skill from './features/skills/Skill.jsx';
import Focus from './features/focus/Focus.jsx';
import Popup from './components/Popup.jsx';

export default function App() {
  const isPopup = new URLSearchParams(window.location.search).get("popup") === "true";
  if(isPopup) {return <Popup/>}

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
    const root = document.documentElement;

    if (mode === MODE.DARK) {
      root.classList.add('dark');
      document.body.style.backgroundImage = "linear-gradient(to top,#d4cad2 5%,#33374e 100%)"
      document.body.style.color = "white";
    } else {
      root.classList.remove('dark');
      document.body.style.backgroundColor = "#f0f2f4";
      document.body.style.backgroundImage = "none";
      document.body.style.color = "#495977";
    }
  }, [mode]);

  //--------MAIN----------------------------------------------------
  return (
    <HashRouter>
      {location.pathname !== "#/popup" && (
        <Nav mode={mode} toggle={toggle} />
      )}

      <div className="App">
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path='/Calendar' element={<Calendar />} />
          <Route path='/Skill' element={<Skill />} />
          <Route path='/Focus' element={<Focus />} />
        </Routes>
      </div>

    </HashRouter>
  )
}

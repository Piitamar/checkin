import { useEffect, useState } from "react";
import { FaMoon, FaCloud } from "react-icons/fa";
import { Link } from "react-router-dom";
import useSkill from "../features/skills/useSkill";

export default function Nav({ mode, toggle }) {
  const { skills } = useSkill();
  const [gold, setGold] = useState(0);

  useEffect(() => {
    const totalSkillExp = skills.reduce((sum, skill) => sum + Number(skill.exp || 0), 0);
    setGold(totalSkillExp);
  }, [skills]);

  return (
    <nav className="flex h-5 w-full flex-row items-center justify-between">
      <div className="flex gap-5">
        <h2><Link to={'/'}>Todo</Link></h2>
        <h2><Link to={'/Calendar'}>Calendar</Link></h2>
        <h2><Link to={'/Skill'}>Skills</Link></h2>
        <h2><Link to={'/Focus'}>Focus</Link></h2>
        <h2 className="font-bold text-pinky"><Link to={'/Game'}>Game</Link></h2>
      </div>

      <div className="ml-60 rounded-xl whitespace-nowrap bg-pinky/70 px-5 py-1 pb-1.5 text-lightwhite shadow-xl shadow-pink-100/10">
        {gold} gold
      </div>

      <label>
        <div onClick={toggle} className="bg-hazy flex h-8 w-18 items-center rounded-2xl transition duration-300 ease-in-out">
          <div className={`${mode === "dark" ? "bg-soft" : "bg-hazy"} w-18 h-8 relative flex items-center rounded-2xl transition duration-300 ease-in-out`}></div>
          <div className={`${mode === "dark" ? "translate-x-10 bg-sparkwhite" : "translate-x-1 bg-darkblue"} absolute bg-darkblue ml-1 mr-1 h-6 w-6 rounded-3xl transition duration-300 ease-in-out`}></div>
          <div className={`${mode === "dark" ? "opacity-0" : "opacity-100"} absolute ml-10 text-darkblue transition duration-300 ease-in-out`}><FaMoon size={22} /></div>
          <div className={`${mode === "dark" ? "opacity-100" : "opacity-0"} absolute ml-1 h-6 w-6 rounded-3xl opacity-0 transition duration-100 ease-in-out`}><FaCloud size={26} /></div>
        </div>
      </label>
    </nav>
  )
}

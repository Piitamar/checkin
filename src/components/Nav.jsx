 import { FaMoon } from "react-icons/fa";
 import { FaCloud} from "react-icons/fa";
 import { Link } from "react-router-dom";

 export default function Nav({mode, toggle}) {
    return (
        <>
        <nav className="flex flex-row items-center justify-between w-full h-5">
            <div className="flex gap-5">
                <h2><Link to={'/'}>Todo</Link></h2>
                <h2><Link to={'/Calendar'}>Calendar</Link></h2>
                <h2>Skills</h2>
            </div>

            <label>
                <div onClick={toggle} className=" bg-hazy w-18 h-8 rounded-2xl flex items-center transition duration-300 ease-in-out">
                    <div className={`${mode === "dark" ? "bg-soft" : "bg-hazy"}
                                    w-18 h-8 relative rounded-2xl flex items-center transition duration-300 ease-in-out`}></div>
                    <div className={`${mode === "dark"
                                    ? "translate-x-10 bg-sparkwhite"
                                    : "translate-x-1 bg-darkblue"}
                                    absolute bg-darkblue w-6 h-6 rounded-3xl ml-1 mr-1 transition duration-300 ease-in-out`}></div>
                    <div className={`${mode === "dark" ? "opacity-0" : "opacity-100"}
                                    absolute ml-10 text-darkblue transition duration-300 ease-in-out`}><FaMoon size={22}/></div>
                    <div className={`${mode === "dark" ? "opacity-100" : "opacity-0"}
                                    absolute ml-1 opacity-0 w-6 h-6 rounded-3xl transition duration-100 ease-in-out`}><FaCloud size={26} /></div>
                </div>
            </label>
        </nav>
        
        </>
        
    )
}
import OverlayEffect from "./SnowVfx";
import { Link } from "react-router-dom";
import Character from "./Character.jsx";

export default function Game() {

    return (
        <section className="relative overlay-hidden p-5 mx-[-32px] my-[-52px] bg-white w-screen h-[100vh]">
            <img src="/bg.png" className="absolute inset-0 w-screen h-screen object-cover" />
            <OverlayEffect src="/snow.webm" className='mix-blend-screen' />
            <Link to='/'><button className="relative text-white hover:scale-105 transition duration-300">Back</button></Link>

            <div className="top-bar">
                <div className="profile"></div>
                <div className="currency"></div>
                <div className="top-actions"></div>
            </div>

            <div className="content">
                <div className="left-menu">
                    <div className="menu-list"></div>
                    <div className="banner"></div>
                </div>

                <div className="center">
                    <div className="character"> 
                        <img src="/character-Photoroom.png" className="relative size-1/2"/>
                    </div>
                </div>

                <div className="right-panel">
                    <div className="story-card"></div>

                    <div className="feature-grid">
                        <div className="gacha-card"></div>
                        <div className="character-card"></div>
                        <div className="inventory-card"></div>
                        <div className="task-card"></div>
                    </div>

                    <div className="battle-card"></div>
                </div>
            </div>

            <div className="bottom-nav"></div>

        </section>
    )
}
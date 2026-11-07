import OverlayEffect from "./SnowVfx";
import { Link } from "react-router-dom";
import Character from "./Character.jsx";

export default function Game() {
    return (
        <section className="relative overflow-hidden p-5 mx-[-32px] my-[-52px] bg-white w-screen h-[100vh]">
            <img
                src="/bg.png"
                className="absolute inset-0 w-screen h-screen object-cover"
            />

            <OverlayEffect src="/snow.webm" className="mix-blend-screen" />

            {/* TOP BAR */}
            <div className="top-bar relative z-20 w-full h-20 flex justify-between items-center px-5">
                <div className="profile flex items-center gap-3">
                    <div className="avatar w-12 h-12 rounded-full overflow-hidden border-2 border-white/80 bg-white/20">

                    </div>

                    <div className="level text-white flex flex-col">
                        <span className="text-xs tracking-widest opacity-70">
                            LV.
                        </span>
                        <span className="text-lg font-semibold">
                            32
                        </span>
                    </div>

                    <div className="profileInfo text-white px-4 py-2">
                        Angelica
                    </div>
                </div>

                <div className="right-topPanel flex items-center gap-4">
                    <div className="currency flex items-center gap-2">
                        <div className="gold flex items-center gap-2 text-white px-3 py-2">
                            <span className="w-6 h-6 rounded-full bg-yellow-400/70 flex items-center justify-center text-xs">
                                G
                            </span>
                            <span>256,890</span>
                        </div>

                        <div className="gems flex items-center gap-2 text-white px-3 py-2">
                            <span className="w-6 h-6 rounded-full bg-cyan-300/70 flex items-center justify-center text-xs">
                                ◆
                            </span>
                            <span>12,450</span>
                        </div>
                    </div>

                    <div className="top-actions flex items-center gap-2">
                        <button className="shop w-11 h-11 text-whiterounded-lg bg-white/10 hover:bg-white/20 transition">
                            🛒
                        </button>

                        <button className="settings w-11 h-11 text-whiterounded-lg bg-white/10 hover:bg-white/20 transition">
                            ⚙
                        </button>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="content flex">
                <div className="center relative flex-1 pl-7">
                    <Link to="/">
                        <button className="relative z-30 text-white hover:scale-105 transition duration-300">
                            Back
                        </button>
                    </Link>
                </div>

                <div className="character absolute top-15 left-0">
                    <img
                        src="/character-Photoroom.png"
                        className="bottom-0 size-1/2 right-20"
                    />
                </div>

                {/* RIGHT PANEL */}
                <div className="right-panel relative flex-end flex flex-col w-120 h-80 p-2 gap-2">
                    <div className="story-card relative h-[35%] border border-white/20 bg-navyblue/40 p-4 text-white">
                        <div className="h-full flex flex-col justify-end">
                            <span className="text-xs tracking-[0.25em] opacity-80">
                                STORY
                            </span>
                            <span className="text-xl font-semibold">
                                [ STORY IMAGE ]
                            </span>
                            <span className="text-sm opacity-80">
                                Chapter 4 — Ashes of the Past
                            </span>
                        </div>
                    </div>

                    <div className="feature-grid grid grid-cols-2 gap-2 flex-1">
                        <div className="gacha-card border h-[55%] border-white/20 bg-navyblue/40 p-3 text-white flex flex-col justify-between">
                            <span className="text-sm tracking-widest">GACHA</span>
                            <div>
                                <p className="font-semibold">[ GACHA IMAGE ]</p>
                                <p className="text-xs opacity-80">Recruit</p>
                            </div>
                        </div>

                        <div className="character-card border h-[55%] border-white/20 bg-navyblue/40 p-3 text-white flex flex-col justify-between">
                            <span className="text-sm tracking-widest">CHARACTERS</span>
                            <div>
                                <p className="font-semibold">[ CHARACTER IMAGE ]</p>
                                <p className="text-xs opacity-80">List</p>
                            </div>
                        </div>

                        <div className="hidden inventory-card border border-white/20 bg-navyblue/40 p-3 text-white flex flex-col justify-between">
                            <span className="text-sm tracking-widest">INVENTORY</span>
                            <div>
                                <p className="font-semibold">[ ITEM IMAGE ]</p>
                                <p className="text-xs opacity-80">Items</p>
                            </div>
                        </div>

                        <div className="hidden task-card border border-white/20 bg-darkblue/40 p-3 text-white flex flex-col justify-between">
                            <span className="text-sm tracking-widest">TASKS</span>
                            <div>
                                <p className="font-semibold">[ TASK IMAGE ]</p>
                                <p className="text-xs opacity-80">Daily Goals</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM NAV */}
            <div className="bottom-nav fixed inset-x-5 mx-2 my-5 bottom-0 z-20 flex h-20 justify-center border border-white/30 bg-navyblue/20 backdrop-blur-sm">
                <div className="flex items-center gap-8 text-white">
                    <button className="flex flex-col items-center gap-1 hover:scale-105 transition">
                        <span className="text-xl">⌂</span>
                        <span className="text-sm">HOME</span>
                    </button>

                    <button className="flex flex-col items-center gap-1 hover:scale-105 transition">
                        <span className="text-xl">⚔</span>
                        <span className="text-sm">QUEST</span>
                    </button>

                    <button className="flex flex-col items-center gap-1 hover:scale-105 transition">
                        <span className="text-xl">⚔</span>
                        <span className="text-sm">BATTLE</span>
                    </button>

                    <button className="flex flex-col items-center gap-1 hover:scale-105 transition">
                        <span className="text-xl">♢</span>
                        <span className="text-sm">GUILD</span>
                    </button>

                    <button className="flex flex-col items-center gap-1 hover:scale-105 transition">
                        <span className="text-xl">▣</span>
                        <span className="text-sm">ARCHIVE</span>
                    </button>

                    <button className="flex flex-col items-center gap-1 hover:scale-105 transition">
                        <span className="text-xl">♧</span>
                        <span className="text-sm">STORE</span>
                    </button>
                </div>
            </div>
        </section>
    );
}

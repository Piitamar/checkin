
import { useState } from "react";
import { Link } from "react-router-dom";
import OverlayEffect from "./SnowVfx";
import AstralSummonAnimation from "./Animation";
import { pullOnce, pullMany } from "./GachaLogic";

const characters = [
    {
        id: "cecilia",
        name: "Cecilia",
        title: "The Wandering Astrologist",
        image: "/cecilia2.png",
        rarity: 5,
    },
    {
        id: "adrian",
        name: "Adrian",
        title: "The Master Architect",
        image: "/andrian2.png",
        rarity: 4,
    },
];

export default function Gacha() {
    const [selectedId, setSelectedId] = useState("adrian");
    const [tickets, setTickets] = useState(100);
    const [message, setMessage] = useState("");

    //animation 
    const [showSummon, setShowSummon] = useState(false);
    const [summonRarity, setSummonRarity] = useState("5star");

    //PULL
    const [pity, setPity] = useState(0);
    const [guaranteedFeatured, setGuaranteedFeatured] = useState(false);
    const [summonResults, setSummonResults] = useState([]);

    const selected = characters.find(
        (item) => item.id === selectedId
    ) || characters[0];

    const handleRoll = (amount) => {
        if (tickets < amount) {
            setMessage("Not enough tickets.");
            return;
        }

        // Thực hiện roll x1 hoặc x10
        const result = pullMany({
            amount,
            characters: characters,
            pity,
            guaranteedFeatured,
            featuredCharacterId: "cecilia",
        });

        // Cập nhật pity và 50/50
        setPity(result.pity);
        setGuaranteedFeatured(result.guaranteedFeatured);

        // Lưu kết quả
        setSummonResults(result.results);

        // Trừ vé
        setTickets((prev) => prev - amount);

        // Xác định rarity cao nhất để chạy animation
        const highestRarity = Math.max(
            ...result.results.map((character) => character.rarity)
        );

        setSummonRarity(highestRarity === 5 ? "5star" : "4star");

        setMessage("");
        setShowSummon(true);
    };

    return (
        <section className="relative overflow-hidden p-2 mx-[-32px] my-[-52px]  w-screen h-[100vh] bg-[#0b1420] text-[#eee9dc] flex flex-col">

            {showSummon && (
                <AstralSummonAnimation
                    backgroundImage="/book.png"
                    rarity={summonRarity}
                    onComplete={() => {
                        setShowSummon(false);
                    }}
                />
            )}

            {/* BACKGROUND */}
            <img
                src="/bg2.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#08111b]/65" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080e18]/80 via-transparent to-[#080e18]/30" />
            <OverlayEffect src="/dust.mp4" videoSpeed={0.5} className="opacity-20" />

            {/* HEADER */}
            <header className="relative z-30 h-[50px] mx-[-10px] pb-2 shrink-0 px-[clamp(16px,3vw,40px)] flex items-center justify-between border-b border-[#c6b98f]/20">

                <div className="flex items-center gap-3">
                    <Link
                        to="/Game"
                        className="w-7 h-7 text-[12px] rounded-full border border-[#c6b98f]/40 flex items-center justify-center hover:bg-white/10 transition"
                    >
                        ←
                    </Link>

                    <div>
                        <h2 className="font-serif text-[20px]">
                            Recruitment
                        </h2>
                        <p className="text-[7px] tracking-[0.3em] text-[#c6b98f]">
                            THE ASTRAL ARCHIVE
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">

                    <div className="flex items-center gap-2 rounded-full border border-white/20 bg-[#101b29]/80 px-2 py-1 text-sm">
                        <span className="text-[#dfc17f]">◉</span>
                        12,450
                        <span className="text-[#c6b98f]">+</span>
                    </div>

                    <div className="flex items-center gap-2 rounded-full border border-white/20 bg-[#101b29]/80 px-2 py-1 text-sm">
                        <span className="text-[#a9c8d3]">✧</span>
                        {tickets}
                        <span className="text-[#c6b98f]">+</span>
                    </div>

                    <Link
                        to="/"
                        className="w-7 h-7 text-[13px] rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10"
                    >
                        ⌂
                    </Link>
                </div>
            </header>

            {/* MOBILE CHARACTER SELECT */}
            <div className="relative z-20 flex md:hidden gap-2 px-4 pt-3">
                {characters.map((character) => (
                    <button
                        key={character.id}
                        onClick={() => setSelectedId(character.id)}
                        className={`px-4 py-2 rounded-md text-xs border ${selectedId === character.id
                            ? "border-[#d8bd86] bg-[#b59b69]/20 text-[#e6d1a2]"
                            : "border-white/20 bg-[#101b29]/80 text-white/60"
                            }`}
                    >
                        {character.name}
                    </button>
                ))}
            </div>

            {/* MAIN CONTENT */}
            <main className="relative z-30 flex-1 min-h-0 grid grid-cols-[clamp(115px,17vw,190px)_minmax(0,1fr)] max-md:grid-cols-1 gap-4 md:gap-5 p-[clamp(12px,2vw,28px)]">

                {/* SIDEBAR */}
                <aside className="hidden md:flex flex-col gap-3 min-h-0">

                    <p className="text-[10px] tracking-[0.25em] text-[#c6b98f] mb-1">
                        BANNERS
                    </p>

                    {characters.map((character) => {
                        const active = selectedId === character.id;

                        return (
                            <button
                                key={character.id}
                                onClick={() => {
                                    setSelectedId(character.id);
                                    setMessage("");
                                }}
                                className={`relative h-[100px] shrink-0 overflow-hidden rounded-lg border text-left transition ${active
                                    ? "border-[#d8bd86] shadow-[0_0_15px_rgba(214,184,123,0.2)]"
                                    : "border-white/20 opacity-65 hover:opacity-100"
                                    }`}
                            >
                                <img
                                    src={character.thumbnail || character.image}
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-cover object-top"
                                />

                                <div className="absolute inset-0 bg-gradient-to-r from-[#101827]/95 to-[#101827]/45" />

                                <div className="relative p-3 flex flex-col justify-center h-full">
                                    <span className="text-[9px] tracking-widest text-[#c6b98f]">
                                        {active ? "✦ FEATURED" : "BANNER"}
                                    </span>

                                    <span className="font-serif text-lg mt-1">
                                        {character.name}
                                    </span>

                                    <span className="text-[#e5c985] text-xs">
                                        ★★★★★
                                    </span>
                                </div>
                            </button>
                        );
                    })}

                </aside>

                {/* BANNER */}
                <div className="relative min-w-0 min-h-0 flex flex-col">

                    <div className="relative flex-1 min-h-0 overflow-hidden rounded-xl border border-[#c6b98f]/45 bg-[#111c2a]/70 shadow-xl">

                        {/* CHARACTER ART */}
                        <img
                            key={selected.id}
                            src={selected.image}
                            alt={selected.name}
                            className="absolute inset-0 w-full h-full object-cover object-center"
                        />

                        {/* LEFT TEXT PROTECTION */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#080d18]/25 via-[#080d18]/5 via-15% to-transparent" />

                        {/* BANNER TEXT */}
                        <div className="absolute inset-y-0 left-0 z-10 w-[52%] flex flex-col justify-center px-[clamp(16px,3vw,42px)]">

                            <p className="text-[10px] md:text-xs tracking-[0.3em] text-[#d6bd86] mb-5">
                                ✧ LIMITED RECRUITMENT
                            </p>

                            <h2 className="font-serif  italic text-[clamp(32px,4vw,64px)] leading-tight">
                                {selected.name}
                            </h2>

                            <p className="font-serif italic text-sm md:text-base text-white/65 mt-2">
                                {selected.title}
                            </p>

                            <div className="mt-7">
                                <p className="text-[10px] tracking-[0.25em] text-[#d6bd86]">
                                    RATE UP
                                </p>

                                <p className="font-serif text-xl mt-1">
                                    {selected.name}
                                </p>

                                <p className="text-[#e5c985] tracking-widest mt-1">
                                    ★★★★★
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* ROLL BUTTONS */}
                    <section className="relative z-20 pt-3 shrink-0 h-[60px] flex items-center justify-end gap-4 bg-[#0b1420]/35 backdrop-blur-sm">
                        {/* DETAILS */}
                        <div className="h-9 shrink-0 flex justify-end items-center">
                            <button className="text-xs text-[#d1bc8b]/70 hover:text-[#e7d3a6]">
                                Details ↗
                            </button>
                        </div>

                        <button
                            onClick={() => handleRoll(1)}
                            className="w-[100px] font-serif text-sm max-w-[20%] h-[40px] rounded-full border border-[#d0c4a5]/80 bg-gradient-to-b from-[#eee5d4] to-[#b9b2a9] text-[#263040] shadow-lg hover:brightness-110 transition"
                        >
                            Recruit ×1
                        </button>

                        <button
                            onClick={() => handleRoll(10)}
                            className="w-[100px] font-serif text-sm max-w-[20%] h-[40px] rounded-full border border-[#e2c58c] bg-gradient-to-b from-[#f2dba8] to-[#b99559] text-[#382d1c] shadow-[0_0_18px_rgba(217,181,113,0.2)] hover:brightness-110 transition"
                        >
                            Recruit ×10
                        </button>
                    </section>
                </div>
            </main>

            {/* MESSAGE */}
            {
                message && (
                    <div className="absolute z-50 bottom-[100px] left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg border border-[#c58d78]/40 bg-[#151b25]/95 text-xs text-[#e8b9a5] whitespace-nowrap">
                        {message}
                    </div>
                )
            }

        </section >
    );
}


export default function GachaSummary({
    results = [],
    onConfirm,
    onRecruitAgain,
    onSkip,
    onSelectCharacter,
    showSkip = false,
}) {
    const getRarityStyle = (rarity) => {
        switch (rarity) {
            case 5:
                return {
                    border: "#EAC77D",
                    glow: "rgba(255, 205, 105, 0.55)",
                    background: "linear-gradient(180deg, #796044 0%, #393044 100%)",
                    accent: "#FFE5A6",
                };

            case 4:
                return {
                    border: "#C29AEF",
                    glow: "rgba(174, 117, 255, 0.45)",
                    background: "linear-gradient(180deg, #625079 0%, #302D4B 100%)",
                    accent: "#E4C9FF",
                };

            default:
                return {
                    border: "#A8B9D5",
                    glow: "rgba(135, 172, 225, 0.35)",
                    background: "linear-gradient(180deg, #53647E 0%, #29364F 100%)",
                    accent: "#D8E4F7",
                };
        }
    };

    const getImage = (character) =>
        character.thumbnail ||
        character.imageRoll ||
        character.image;

    return (
        <div
            className="fixed inset-0 z-[60] overflow-hidden"
            style={{
                color: "#F2E8DB",
            }}
        >
            {/* Background */}
            <div
                className="hidden absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(ellipse at 50% 42%,
                            rgba(91, 83, 130, 0.48),
                            transparent 65%
                        ),
                        radial-gradient(ellipse at 10% 90%,
                            rgba(87, 67, 105, 0.25),
                            transparent 45%
                        ),
                        linear-gradient(135deg,
                            #171A2C,
                            #222238 50%,
                            #111522
                        )
                    `,
                }}
            />

            {/* bg img */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: "url('/bgPullRes.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* Starry atmosphere */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity: 0.55,
                    backgroundImage: `
                        radial-gradient(1px 1px at 10% 20%, white 50%, transparent 100%),
                        radial-gradient(2px 2px at 30% 60%, #E8D4AE 50%, transparent 100%),
                        radial-gradient(1px 1px at 55% 15%, white 50%, transparent 100%),
                        radial-gradient(2px 2px at 75% 40%, #D9C4FF 50%, transparent 100%),
                        radial-gradient(1px 1px at 90% 80%, white 50%, transparent 100%),
                        radial-gradient(1px 1px at 20% 85%, white 50%, transparent 100%)
                    `,
                }}
            />

            {/* Decorative orbital circles */}
            <div
                className="absolute pointer-events-none rounded-full"
                style={{
                    width: "75vw",
                    height: "75vw",
                    maxWidth: "1100px",
                    maxHeight: "1100px",
                    border: "1px solid rgba(215, 190, 150, 0.12)",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            />

            <div
                className="absolute pointer-events-none rounded-full"
                style={{
                    width: "90vw",
                    height: "90vw",
                    maxWidth: "1300px",
                    maxHeight: "1300px",
                    border: "1px solid rgba(215, 190, 150, 0.08)",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            />

            {/* Skip */}
            {showSkip && (
                <button
                    onClick={onSkip}
                    className="absolute z-30 hover:opacity-60 transition-opacity"
                    style={{
                        top: "clamp(14px, 2.5vh, 28px)",
                        right: "clamp(20px, 4vw, 60px)",
                        fontSize: "clamp(12px, 1vw, 15px)",
                        letterSpacing: "0.08em",
                        color: "#E8DCCB",
                    }}
                >
                    Skip »
                </button>
            )}

            {/* Main Layout */}
            <main
                className="relative z-10 flex flex-col items-center justify-between w-full h-full"
                style={{
                    paddingTop: "clamp(22px, 4vh, 48px)",
                    paddingBottom: "clamp(20px, 4vh, 42px)",
                    paddingLeft: "clamp(16px, 4vw, 60px)",
                    paddingRight: "clamp(16px, 4vw, 60px)",
                }}
            >
                {/* Header */}
                <header className="flex flex-col items-center shrink-0">
                    <div className="flex items-center gap-4">
                        <span
                            style={{
                                color: "#D7BC8C",
                                fontSize: "clamp(17px, 2vw, 27px)",
                            }}
                        >
                            ✧
                        </span>

                        <h1
                            className="font-serif italic mt-12"
                            style={{
                                fontSize: "clamp(24px, 2.8vw, 39px)",
                                color: "#F1E4D3",
                                letterSpacing: "0.02em",
                            }}
                        >
                            Recruitment Results
                        </h1>

                        <span
                            style={{
                                color: "#D7BC8C",
                                fontSize: "clamp(17px, 2vw, 27px)",
                            }}
                        >
                            ✧
                        </span>
                    </div>

                    <div
                        className="mt-3"
                        style={{
                            width: "clamp(100px, 15vw, 220px)",
                            height: "1px",
                            background:
                                "linear-gradient(90deg, transparent, #B99C70, transparent)",
                        }}
                    />
                </header>

                {/* Character Grid */}
                <section
                    className="grid grid-cols-5 max-w-[70vw]"
                    style={{
                        maxWidth: "1000px",
                        gap: "clamp(8px, 1.5vw, 22px)",
                        alignItems: "center",
                    }}
                >
                    {results.slice(0, 10).map((character, index) => {
                        const rarity = character.rarity || 3;
                        const style = getRarityStyle(rarity);

                        const isNew = character.isNew === true;

                        return (
                            <button
                                key={`${character.id}-${index}`}
                                onClick={() =>
                                    onSelectCharacter?.(character, index)
                                }
                                title={character.name}
                                className="relative group w-[15vw] h-[25vh] text-left transition-all duration-300"
                                style={{
                                    aspectRatio: "0.70 / 1",
                                    borderRadius: "clamp(9px, 1vw, 15px)",
                                    padding: "clamp(3px, 0.35vw, 5px)",
                                    background: style.background,
                                    border: `1.5px solid ${style.border}`,
                                    boxShadow: `
                                        0 0 12px ${style.glow},
                                        inset 0 0 12px rgba(255,255,255,0.08),
                                        0 8px 20px rgba(0,0,0,0.35)
                                    `,
                                    minWidth: 0,
                                }}
                            >
                                {/* Inner Frame */}
                                <div
                                    className="relative w-full h-full overflow-hidden"
                                    style={{
                                        borderRadius: "inherit",
                                        border: "1px solid rgba(255,255,255,0.16)",
                                        background:
                                            "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(10,15,30,0.35))",
                                    }}
                                >
                                    {/* Character Image */}
                                    <div
                                        className="absolute w-[350%] h-[200%] -translate-x-[32%] translate-y-[-5%] inset-0 flex items-center justify-center"
                                        style={{
                                            background: `
                                                radial-gradient(
                                                    ellipse at 50% 35%,
                                                    ${style.glow},
                                                    transparent 75%
                                                )
                                            `,
                                        }}
                                    >
                                        {getImage(character) ? (
                                            <img
                                                src={getImage(character)}
                                                alt={character.name}
                                                draggable="false"
                                                className="w-full h-full object-cover object-top"
                                            />
                                        ) : (
                                            <span
                                                className="font-serif text-white/50"
                                                style={{
                                                    fontSize: "clamp(14px, 2vw, 28px)",
                                                }}
                                            >
                                                {character.name}
                                            </span>
                                        )}
                                    </div>

                                    {/* Bottom Gradient */}
                                    <div
                                        className="absolute inset-x-0 bottom-0 h-[35%] pointer-events-none"
                                        style={{
                                            background:
                                                "linear-gradient(transparent, rgba(13,17,32,0.88))",
                                        }}
                                    />

                                    {/* Element / Role Symbol */}
                                    <div
                                        className="absolute z-10 flex items-center justify-center"
                                        style={{
                                            top: 0,
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            color: style.accent,
                                            fontSize: "clamp(15px, 1.7vw, 24px)",
                                            textShadow: "0 2px 8px rgba(0,0,0,0.7)",
                                        }}
                                    >
                                        {character.symbol || "✧"}
                                    </div>

                                    {/* Stars */}
                                    <div
                                        className="absolute bottom-2 left-0 w-full flex justify-center gap-[1px]"
                                        style={{
                                            color: "#F5D88E",
                                            fontSize: "clamp(8px, 1vw, 14px)",
                                            textShadow: "0 1px 5px rgba(0,0,0,0.8)",
                                        }}
                                    >
                                        {"★".repeat(rarity)}
                                    </div>

                                    {/* NEW */}
                                    {isNew && (
                                        <div
                                            className="absolute top-0 left-0 z-20 font-serif italic"
                                            style={{
                                                background: "#EBD4A7",
                                                color: "#493B32",
                                                padding: "3px 9px",
                                                fontSize: "clamp(9px, 0.8vw, 12px)",
                                                borderBottomRightRadius: "8px",
                                            }}
                                        >
                                            New
                                        </div>
                                    )}

                                    {/* Decorative corner */}
                                    <div
                                        className="absolute top-1 right-1 pointer-events-none"
                                        style={{
                                            color: style.accent,
                                            opacity: 0.8,
                                            fontSize: "clamp(10px, 1vw, 14px)",
                                        }}
                                    >
                                        ✦
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </section>

                {/* Bottom Actions */}
                <footer
                    className="flex items-center justify-center shrink-0 flex-wrap"
                    style={{
                        gap: "clamp(12px, 4vw, 65px)",
                    }}
                >
                    <button
                        onClick={onConfirm}
                        className="rounded-full font-serif transition-all duration-200 hover:brightness-110 active:scale-95"
                        style={{
                            minWidth: "clamp(130px, 17vw, 250px)",
                            padding: "clamp(9px, 1vw, 14px) 24px",
                            background:
                                "linear-gradient(135deg, #EDE3D9, #D9C9B9)",
                            color: "#393348",
                            fontSize: "clamp(13px, 1.1vw, 17px)",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                        }}
                    >
                        Confirm
                    </button>

                    <button
                        onClick={onRecruitAgain}
                        className="rounded-full font-serif transition-all duration-200 hover:brightness-110 active:scale-95"
                        style={{
                            minWidth: "clamp(160px, 21vw, 300px)",
                            padding: "clamp(9px, 1vw, 14px) 24px",
                            background:
                                "linear-gradient(135deg, #F0D9A8, #C9A66C)",
                            color: "#393044",
                            fontSize: "clamp(13px, 1.1vw, 17px)",
                            boxShadow: "0 4px 18px rgba(0,0,0,0.25)",
                        }}
                    >
                        Recruit ×10 Again
                        <span className="ml-3 opacity-70">✧ ×10</span>
                    </button>
                </footer>
            </main>
        </div>
    );
}

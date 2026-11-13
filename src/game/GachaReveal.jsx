
export default function GachaReveal({
    character,
    onContinue,
    onSkip,
    showSkip = false,
    pageBackground = "",
    bannerBackground = "/bgPullRes.png",
}) {
    const traits = character.traits || [
        character.element,
        character.role,
    ].filter(Boolean);

    const rarity = Math.max(
        1,
        Math.min(5, character.rarity || 5)
    );

    const colors = {
        background: "#F4F0F7",
        text: "#39344F",
        muted: "#77718D",
        accent: "#C49D59",
        border: "rgba(142, 127, 165, 0.25)",
        button: "#E9D9B9",
        buttonText: "#40364A",
        secondary: "rgba(255, 255, 255, 0.45)",
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
            style={{
                backgroundColor: colors.background,
                backgroundImage: pageBackground
                    ? `url(${pageBackground})`
                    : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Reveal Canvas */}
            <main
                className="relative overflow-hidden w-screen h-screen"
                style={{
                    backgroundColor: colors.background,
                    color: colors.text,
                }}
            >
                {/* Background Image */}
                {bannerBackground && (
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: `url(${bannerBackground})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                )}

                {/* Soft Overlay */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(circle at 40% 45%, rgba(255,255,255,0.12), transparent 65%)",
                    }}
                />

                {/* Skip Button */}
                {showSkip && (
                    <button
                        onClick={onSkip}
                        className="absolute right-8 top-7 z-30 rounded-full px-3 py-1 text-xs tracking-wider transition-all hover:opacity-70"
                        style={{
                            color: colors.muted,
                        }}
                    >
                        Skip »
                    </button>
                )}

                {/* Character Artwork */}
                <div
                    className="absolute flex items-center justify-center"
                    style={{
                        left: "0%",
                        top: 250,
                        width: "75%",
                        height: "100%",
                        transform: "translateY(5%)",
                    }}
                >
                    <img
                        src={character.imageRoll}
                        alt={character.name}
                        draggable="false"
                        style={{
                            width: "190%",
                            height: "190%",
                            maxWidth: "none",
                            maxHeight: "none",
                            objectFit: "contain",
                            objectPosition: "center",
                            filter:
                                "drop-shadow(0 12px 20px rgba(65, 48, 75, 0.12))",
                        }}
                    />
                </div>

                {/* Character Information */}
                <section
                    className="absolute right-[10%] top-1/2 z-10 flex items-center w-[30%] -translate-y-1/2 flex-col gap-4"
                >
                    {/* Rarity */}
                    <div
                        className="flex gap-1 text-xl"
                        style={{ color: colors.accent }}
                    >
                        {"★".repeat(rarity)}
                    </div>

                    {/* Name */}
                    <div className="space-y-2 flex items-center flex-col justify-center">
                        <h1
                            className="font-serif text-5xl font-medium text-white/80 tracking-tight"
                        >
                            {character.name}
                        </h1>

                        <p
                            className="font-serif text-center pl-2 text-sm italic"
                            style={{ color: colors.muted }}
                        >
                            {character.title}
                        </p>
                    </div>

                    {/* Traits */}
                    {traits.length > 0 && (
                        <div className="flex pl-2 flex-wrap gap-2">
                            {traits.map((trait, index) => (
                                <span
                                    key={`${trait}-${index}`}
                                    className="rounded-full px-3 py-1 text-xs text-white/50 tracking-wide"
                                    style={{
                                        background: colors.secondary,
                                        border: `1px solid ${colors.border}`,
                                        
                                    }}
                                >
                                    {trait}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Quote */}
                    {character.quote && (
                        <p
                            className="pl-5 font-serif text-center text-xs italic leading-relaxed"
                            style={{ color: colors.muted }}
                        >
                            “{character.quote}”
                        </p>
                    )}
                </section>

                {/* Continue Button */}
                <div className="absolute bottom-8 right-8 z-30">
                    <button
                        onClick={onContinue}
                        className="rounded-full px-3 py-2 font-serif text-xs transition-all duration-200 hover:scale-105 active:scale-95"
                        style={{
                            background: colors.button,
                            color: colors.buttonText,
                            border: `1px solid ${colors.border}`,
                        }}
                    >
                        Continue
                    </button>
                </div>
            </main>
        </div>
    );
}

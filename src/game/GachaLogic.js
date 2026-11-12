
export const GACHA_CONFIG = {
    fiveStarBaseRate: 0.005,
    hardPity: 25,
    featuredChance: 0.5,
};

// Random một phần tử trong danh sách
const pickRandom = (items) => {
    if (!items || items.length === 0) {
        throw new Error("Character pool is empty.");
    }

    return items[Math.floor(Math.random() * items.length)];
};

// Lọc nhân vật theo rarity
const getCharacterPool = (characters, rarity) =>
    characters.filter((character) => character.rarity === rarity);

// Tỷ lệ xuất hiện 5 sao
const getFiveStarRate = (nextPity) => {
    if (nextPity >= GACHA_CONFIG.hardPity) {
        return 1;
    }

    return GACHA_CONFIG.fiveStarBaseRate;
};

// Roll một lượt
export function pullOnce({
    characters,
    pity = 0,
    guaranteedFeatured = false,
    featuredCharacterId,
}) {
    const nextPity = pity + 1;
    const fiveStarRate = getFiveStarRate(nextPity);

    const isFiveStar = Math.random() < fiveStarRate;

    if (isFiveStar) {
        const fiveStars = getCharacterPool(characters, 5);

        const featuredCharacter = fiveStars.find(
            (character) => character.id === featuredCharacterId
        );

        const offBannerPool = fiveStars.filter(
            (character) => character.id !== featuredCharacterId
        );

        if (!featuredCharacter) {
            throw new Error("Featured character not found.");
        }

        let character;
        let wonFiftyFifty = true;

        if (guaranteedFeatured) {
            character = featuredCharacter;
        } else if (Math.random() < GACHA_CONFIG.featuredChance) {
            character = featuredCharacter;
        } else {
            character = pickRandom(offBannerPool);
            wonFiftyFifty = false;
        }

        return {
            result: {
                ...character,
                wonFiftyFifty,
                isFeatured: character.id === featuredCharacterId,
            },
            pity: 0,
            guaranteedFeatured: !wonFiftyFifty,
        };
    }

    const fourStars = getCharacterPool(characters, 4);

    return {
        result: pickRandom(fourStars),
        pity: nextPity,
        guaranteedFeatured,
    };
}

// Roll x1 hoặc x10
export function pullMany({
    amount,
    characters,
    pity = 0,
    guaranteedFeatured = false,
    featuredCharacterId,
}) {
    if (![1, 10].includes(amount)) {
        throw new Error("Pull amount must be 1 or 10.");
    }

    let currentPity = pity;
    let currentGuarantee = guaranteedFeatured;

    const results = [];

    for (let i = 0; i < amount; i++) {
        const pull = pullOnce({
            characters,
            pity: currentPity,
            guaranteedFeatured: currentGuarantee,
            featuredCharacterId,
        });

        results.push(pull.result);

        currentPity = pull.pity;
        currentGuarantee = pull.guaranteedFeatured;
    }

    return {
        results,
        pity: currentPity,
        guaranteedFeatured: currentGuarantee,
    };
}

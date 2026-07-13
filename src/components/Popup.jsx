import { useMemo } from "react";

export default function Popup() {
    const imgs = ["flins.png", "flins3.png", "images.png"];

    const messages = [
        "Hết giờ rồi em ơi, nghỉ ngơi đi!",
        "Dậy chạm cỏ đi em",
        "Uống miếng nước đi em yêu",
        "Em làm tốt lắm",
        "Tôi buồn ngủ quá rồi...",
        "Cứ chăm chỉ như này em sẽ sớm thành phú bà đó"
    ];

    const randomImg = useMemo(() => {
        return imgs[Math.floor(Math.random() * imgs.length)];
    }, []);

    const randomMessage = useMemo(
        () => messages[Math.floor(Math.random() * messages.length)],
        [])

    return (
        <section className="fixed inset-0 overflow-hidden bg-black/80 flex flex-col justify-center items-center">
            <img src={randomImg} className="w-52" />
            <h2 className="text-white p-5">{randomMessage}</h2>
        </section>
    )
}
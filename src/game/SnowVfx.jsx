export default function OverlayEffect({ src }) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute mix-blend-screen inset-0 w-full h-full object-cover pointer-events-none select-none z-10"
    >
      <source src={src} type="video/webm" />
    </video>
  );
}
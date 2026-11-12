export default function OverlayEffect({ src, videoSpeed = 1 }) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      aria-hidden="true"
      ref={(video) => {
        if (video) video.playbackRate = videoSpeed;
      }}
      className="absolute inset-0 z-10 h-full w-full scale-y-[-1] object-cover mix-blend-screen pointer-events-none select-none"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

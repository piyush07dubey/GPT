const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute z-10 flex aspect-video w-screen items-center bg-gradient-to-r from-black via-black/70 to-transparent px-6 pt-[15%] md:px-12 lg:px-24 pointer-events-none">
      <div className="pointer-events-auto max-w-2xl">
        <h1 className="mb-4 text-2xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-xl md:text-5xl lg:text-6xl">
          {title}
        </h1>

        <p className="mb-8 hidden md:inline-block max-w-xl text-base leading-relaxed text-gray-200 drop-shadow-md md:block lg:text-lg">
          {overview}
        </p>

        <div className="flex gap-4">
          <button className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-lg font-bold text-black shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:bg-gray-200 active:scale-95 md:px-8 md:py-4 md:text-xl">
            <span className="text-xl">▶</span> Play
          </button>

          <button className="flex items-center gap-2 rounded-lg border border-white/30 bg-white/20 px-6 py-3 text-lg font-bold text-white shadow-lg backdrop-blur-md transition-all duration-300 ease-out hover:scale-105 hover:bg-white/30 active:scale-95 md:px-8 md:py-4 md:text-xl">
            <span className="text-xl">ℹ</span> More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;

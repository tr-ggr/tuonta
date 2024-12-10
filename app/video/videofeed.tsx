export const VideoFeed = () => {
    return (
      <div className="flex-1 bg-black flex items-center justify-center rounded-lg">
        {/* Image as the video feed */}
        <img
          src="/images/zak.gif"
          alt="Video Feed"
          className="object-cover w-full h-full"
        />
        <span className="text-white absolute">Main Presenter / Video Feed</span>
      </div>
    );
  };
  
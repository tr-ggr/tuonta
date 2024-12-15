// export const VideoFeed = () => {
//     return (
//       <div className="flex-1 bg-black flex items-center justify-center rounded-lg">
//         {/* Image as the video feed */}
//         <img
//           src="/images/zak.gif"
//           alt="Video Feed"
//           className="object-cover w-full h-full"
//         />
//         <span className="text-white absolute">Main Presenter / Video Feed</span>
//       </div>
//     );
//   };
  



import { FC } from 'react';

interface VideoFeedProps {
  videoUrl: string;  // URL for the video or GIF feed
  description: string; // Description of the video feed (e.g., "Main Presenter")
}

export const VideoFeed: FC<VideoFeedProps> = ({ videoUrl, description }) => {
  return (
    <div className="flex-1 bg-black flex items-center justify-center rounded-lg relative">
      {/* Image as the video feed */}
      <img
        src={videoUrl} // Dynamically passed video URL
        alt="Video Feed"
        className="object-cover w-full h-full"
      />
      <span className="text-white absolute">{description}</span>
    </div>
  );
};

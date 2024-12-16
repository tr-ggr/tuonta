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
  videoUrl: string; // URL for the video or GIF feed
  description: string; // Description of the video feed (e.g., "Main Presenter")
}

export const VideoFeed: FC<VideoFeedProps> = ({ videoUrl, description }) => {
  return (
    <div className="flex-1 bg-black flex items-center justify-center rounded-lg relative">
      {/* Render the video feed as an image */}
      <img
        src={videoUrl} 
        alt="Video Feed"
        className="object-contain w-full max-h-96"
      />
      <span className="text-white absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded">
        {description}
      </span>
    </div>
  );
};

// Example usage of the VideoFeed component with a local GIF file
export const ExampleUsage = () => {
  return (
    <VideoFeed
      videoUrl="" // Path to the local GIF file
      description="Main Presenter / Video Feed"
    />
  );
};

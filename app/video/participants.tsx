// export const Participants = () => {
//     return (
//       <div className="w-full p-4 bg-gray-600">
//         <div className="grid grid-cols-4 gap-4">
//           {[1, 2, 3, 4].map((id) => (
//             <div
//               key={id}
//               className="w-full h-24 bg-gray-800 rounded-lg flex items-center justify-center"
//             >
//               {/* Participant name label */}
//               <span className="text-white font-semibold">Participant {id}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };




export const Participants = () => {
    // Array of GIF URLs for each participant
    const participantGifs = [
      "/images/wewe.gif", // Participant 1 GIF
      "/images/wewe.gif", // Participant 2 GIF
      "/images/wewe.gif", // Participant 3 GIF
      "/images/wewe.gif", // Participant 4 GIF
    ];
  
    return (
      <div className="w-full p-4 bg-gray-600">
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((id) => (
            <div
              key={id}
              className="w-full h-24 bg-gray-800 rounded-lg flex items-center justify-center relative"
            >
              {/* GIF for each participant */}
              <img
                src={participantGifs[id - 1]} // Select the appropriate GIF based on the participant ID
                alt={`Participant ${id} GIF`}
                className="w-full h-full object-cover rounded-lg absolute"
              />
  
              {/* Participant name label */}
              <span className="text-white font-semibold z-10">{`Participant ${id}`}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  
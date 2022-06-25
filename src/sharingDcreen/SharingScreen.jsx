import React, { useState } from "react";
import scrVd from "./The Killers - Mr. Brightside.mp4";
function SharingScreen() {
  const videoRef = React.useRef(null);
  const [, setState] = useState(true);
  const handleStartSharing = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      videoRef.current.srcObject = stream;
    } catch (e) {
      console.warn(e);
    }
  };
  const handleStopSharing = () => {
    let tracks = videoRef.current.srcObject.getTracks();
    videoRef.current.srcObject = null;
    tracks.forEach((track) => track.stop());
  };
  return (
    <div>
      <div className="flex items-center justify-center p-8">
        <button
          className="bg-green-500 p-4 py-2 mx-3 font-semibold text-white rounded-lg shadow-lg active:opacity-30 hover:opacity-50"
          onClick={handleStartSharing}
        >
          Sharing screen
        </button>
        <button
          className="bg-red-500 p-4 py-2 mx-3 font-semibold text-white rounded-lg shadow-lg active:opacity-30 hover:opacity-50"
          onClick={handleStopSharing}
        >
          stop Sharing{" "}
        </button>
      </div>
      <video
        className="w-96 bg-black/10 h-80 absolute bottom-4 right-4 shadow-lg rounded-xl"
        autoPlay
        ref={videoRef}
      />
    </div>
  );
}

export default SharingScreen;

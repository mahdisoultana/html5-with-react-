import React, { useState, useRef, useEffect } from "react";

function MediaRecorder() {
  const [start, setStart] = useState(true);
  const [pause, setPause] = useState(true);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useMediaRecorder(videoRef, setStream);

  return (
    <>
      <RecordingBtn
        pause={pause}
        setPause={setPause}
        start={start}
        setStart={setStart}
        stream={stream}
      />
      <div className="h-[80vh] bg-gray-900  shadow-lg overflow-hidden rounded-lg m-3">
        <video
          ref={videoRef}
          className="h-full w-full inline-block "
          id="video"
        ></video>
      </div>
    </>
  );
}

export default MediaRecorder;

function useMediaRecorder(videoRef, setStream) {
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setStream(stream);
        videoRef.current.addEventListener("loadedmetadata", () => {
          videoRef.current.play();
        });
      });
  }, []);
}

function useBtnsEffect({ start, pause, recFn }) {
  //this for start and stop recording
  const rendered = useRef(false);
  useEffect(() => {
    if (rendered.current) {
      if (start) {
        recFn?.start();
        console.log("Stop EffectFire💥 ");
      } else {
        recFn?.stop();
        console.log("Start EffectFire💥 ");
      }
    }
  }, [start]);
  //this for resume recording and pause
  useEffect(() => {
    if (rendered.current) {
      if (pause) {
        recFn?.resume();
        console.log("Resume EffectFire💥 ");
      } else {
        recFn?.pause();
        console.log("Pause EffectFire💥 ");
      }
    }
  }, [pause]);
  useEffect(() => {
    rendered.current = true;
    return () => (rendered.current = false);
  }, []);
}

function RecordingBtn({ start, setStart, pause, setPause, stream }) {
  //btn1

  const recRef = useRef(null);

  const StartAndStop = (
    <>
      {start ? (
        <button
          className="btn-primary block bg-green-500"
          onClick={startRecording}
        >
          Start Recording
        </button>
      ) : (
        <button
          className="btn-primary block bg-red-500"
          onClick={stopRecording}
        >
          stop Recording
        </button>
      )}
    </>
  );
  async function startRecording() {
    setStart(false);
  }
  function stopRecording() {
    setStart(true);
  }
  //btn2
  const ResumAndPause = (
    <>
      {pause ? (
        <button
          className="btn-primary block bg-orange-500"
          onClick={pauseRecording}
        >
          pause Recording
        </button>
      ) : (
        <button
          className="btn-primary block bg-yellow-500"
          onClick={resumeRecording}
        >
          resume Recording
        </button>
      )}
    </>
  );
  function pauseRecording() {
    setPause(false);
  }
  function resumeRecording() {
    setPause(true);
  }

  return (
    <div
      className="flex justify-center
      items-center"
    >
      {StartAndStop}
      {!start && ResumAndPause}
    </div>
  );
}
function recordAudio() {
  return new Promise((resolve) => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);

        const audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", (e) => {
          audioChunks.push(e.data);
        });

        function start() {
          mediaRecorder.start();
        }
        function pause() {
          mediaRecorder.pause();
        }
        function resume() {
          mediaRecorder.resume();
        }
        function stop() {
          return new Promise((resolve) => {
            mediaRecorder.addEventListener("stop", () => {
              const audioName = v4();
              const audioFile = new File(audioChunks, audioName, {
                type: "audio/mpeg",
              });
              const audioUrl = URL.createObjectURL(audioFile);
              const audio = new Audio(audioUrl);
              function play() {
                audio.play();
              }
              resolve({ audioFile, audioName, audioUrl, play });
            });
            mediaRecorder.stop();
          });
        }
        resolve({ start, stop, resume, pause });
      })
      .catch((e) => console.log("errrrror", e));
  });
}

import react, { useEffect, useRef } from "react";
import loadFaceMesh from "./faceMesh";
export const useFaceMesh = (
  mediaRecorderRef,
  videoRef,
  stateMachine,
  setCurrentStepIndex,
  containerRef,
  setIsFaceInCorrectPosition,
  setIsLoading,
  currentStep,
  setFirstStepCompleted,
  setRecordedChunks,
  recordedChunks,
  streamRef,
  videoContainer
) => {
  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      // await new Promise((resolve) => (video.onloadedmetadata = resolve));
      videoRef.current.play();
      setIsLoading(false);
      setupMediaRecorder(stream);
    } catch (err) {
      console.error("Error accessing the camera: ", err);
    }
  };

  const setupMediaRecorder = (stream) => {
    const options = { mimeType: "video/webm; codecs=vp9" };
    const mediaRecorder = new MediaRecorder(stream, options);
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };
    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, {
        type: "video/mp4",
      });
    };
  };
  useEffect(() => {
    const initializeFaceMesh = async () => {
      try {
        const FaceMesh = await loadFaceMesh();
        const video = videoRef.current;
        const faceMesh = new FaceMesh({
          locateFile: (file) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
        });

        faceMesh.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        const onResults = (results) => {
          if (
            results.multiFaceLandmarks &&
            results.multiFaceLandmarks.length > 0
          ) {
            const landmarks = results.multiFaceLandmarks[0];
            // const landmarks = results.multiFaceLandmarks[0];
            const noseTip = landmarks[1]; // Nose tip
            const leftEyebrow = landmarks[70]; // Left eyebrow
            const rightEyebrow = landmarks[300]; // Right eyebrow
            const leftEyeInner = landmarks[133]; // Left eye inner corner
            const rightEyeInner = landmarks[362]; // Right eye inner corner
            const chin = landmarks[152]; // Chin
            const leftCheek = landmarks[234]; // Left cheek
            const rightCheek = landmarks[454]; // Right cheek

            // const chin = landmarks[152];

            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;

            let headPosition = "";

            const midPointEyeBrow = {
              x: (leftEyebrow.x + rightEyebrow.x) / 2,
              y: (leftEyebrow.y + rightEyebrow.y) / 2,
            };

            const sideLeftFaceX =
              noseTip.x * videoWidth - leftEyebrow.x * videoWidth;

            const sideRightFaceX = Math.abs(
              noseTip.x * videoWidth - rightEyebrow.x * videoWidth
            );

            const sideUpFaceUpY = midPointEyeBrow.y;
            const sideDownFaceY = Math.abs(chin.y);
            const betNoisAndUpSide = Math.abs(
              Math.floor(noseTip.y * 10) - Math.floor(sideUpFaceUpY * 10)
            );
            const betNoisAndDownSide = Math.abs(
              Math.floor(sideDownFaceY * 10) - Math.floor(noseTip.y * 10)
            );

            if (
              Math.abs(sideRightFaceX - sideLeftFaceX) < 5 &&
              (betNoisAndUpSide === 1 || betNoisAndUpSide === 2) &&
              betNoisAndDownSide === 2
            ) {
              headPosition = "center";
              containerRef.current.style.stroke = "#00db5e";
              stateMachine.current = headPosition;
              setFirstStepCompleted(true);
            } else {
              containerRef.current.style.stroke = "#00db5e";
            }

            // Check if the head position matches the current step exactly
            if (currentStep && headPosition === currentStep) {
              setIsFaceInCorrectPosition(true);
            } else {
              setIsFaceInCorrectPosition(false);
            }
          }
        };

        faceMesh.onResults(onResults);

        video.addEventListener("loadeddata", async () => {
          const detect = async () => {
            await faceMesh.send({ image: video });
            requestAnimationFrame(detect);
          };
          detect();
        });
        await startVideo();
      } catch (error) {
        console.error(error);
      }
    };

    initializeFaceMesh();
  }, []);
  return { startVideo };
};

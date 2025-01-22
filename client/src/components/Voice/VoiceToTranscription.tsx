import React, { useState, useRef, FunctionComponent } from "react";
import VoiceRecording from "./VoiceRecording";

// This component is responsible for sending the voice blob to the api endpoint for transcription

const VoiceToTranscription = () => {
  const handleStopRecording = async (audioBlob: Blob) => {
    // Send the blob to the transcription endpoint
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");

    try {
      const response = await fetch("/api/upload-audio", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Transcription:", data);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <>
      <VoiceRecording onStopRecording={handleStopRecording} />
    </>
  );
};

export default VoiceToTranscription;

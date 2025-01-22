import React, { useState, useRef, FunctionComponent } from "react";
import styles from "../../app/page.module.css";
import RecordButton from "./RecordButton";

type Props = {
  onStopRecording: (audioBlob: Blob) => void;
};
// This components records the voice of a user when start recording button is pressed
const VoiceRecording: FunctionComponent<Props> = ({ onStopRecording }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        // Start the microphone and recording
        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setStream(audioStream);

        const mediaRecorder = new MediaRecorder(audioStream);
        setRecorder(mediaRecorder);

        mediaRecorder.ondataavailable = (event: BlobEvent) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });
          audioChunksRef.current = []; // Clear the chunks after creating the blob
          onStopRecording(audioBlob); // send audio blob to transcription from parent component
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Error starting recording:", error);
      }
    } else {
      // Stop recording and microphone
      if (recorder && stream) {
        recorder.stop();
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
        setIsRecording(false);
      }
    }
  };

  return (
    <div className={styles.submitButton}>
      <RecordButton toggleRecording={toggleRecording} recording={isRecording} />
    </div>
  );
};

export default VoiceRecording;

import React, { FunctionComponent } from "react";
import styles from "../../app/page.module.css";

type Props = {
  recording: boolean;
  toggleRecording: () => void;
};
// Recording button used in the parent component VoiceRecording
const RecordButton: FunctionComponent<Props> = ({
  recording,
  toggleRecording,
}) => {
  return (
    <div className={styles.submitButton}>
      <button style={{ padding: "3px" }} onClick={toggleRecording}>
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  );
};

export default RecordButton;

// custom hook to fetch stream
import { useState, useRef } from "react";

export function useFetchStream() {
  const [loading, setLoading] = useState(false);
  const [stream, setStream] = useState("");
  const streamRef = useRef("");
  // test with fake stream endpoint /get-stream
  async function fetchStream(inputText: string) {
    setLoading(true);
    try {
      const inputTextEncoded = encodeURIComponent(inputText);
      const response = await fetch(`/api/chat?input_text=${inputTextEncoded}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("ReadableStream reader is not available.");

      const decoder = new TextDecoder("utf-8");
      let accumulatedChunks = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedChunks += chunk;

        console.log("accumulatedChunks:", accumulatedChunks);

        if (accumulatedChunks.length > 50) {
          streamRef.current += accumulatedChunks;
          setStream(streamRef.current);
          accumulatedChunks = "";
        }
      }

      if (accumulatedChunks) {
        streamRef.current += accumulatedChunks;
        setStream(streamRef.current);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, stream, fetchStream };
}

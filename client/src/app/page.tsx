"use client"; // This is a client component
import Image from "next/image";
import styles from "./page.module.css";
import {
  useState,
  ChangeEvent,
  FormEvent,
  use,
  useRef,
  Component,
} from "react";
import React, { useEffect } from "react";
import { Tooltip } from "@nextui-org/react";
import TypingEffect from "@/components/TypingEffect";
import Head from "next/head";
import VoiceToTranscription from "@/components/Voice/VoiceToTranscription";

import { flushSync } from "react-dom";

interface GenerateResponse {
  prompt: string;
}

export default function Home() {
  const [loading, setLoading] = useState(false); // Add loading state
  const [inputText, setInputText] = useState<string>("");
  const [stream, setStream] = useState("");
  const streamRef = useRef("");
  const [renderTrigger, setRenderTrigger] = useState(false);

  async function fetchStream(
    event: React.FormEvent<HTMLFormElement>,
    input_text: string
  ) {
    event.preventDefault();
    setLoading(true);
    try {
      const inputTextEncoded = encodeURIComponent(inputText);
      const response: Response = await fetch(
        `/api/chat?input_text=${inputTextEncoded}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("ReadableStream reader is not available.");
      }

      const decoder = new TextDecoder("utf-8");
      let accumulatedChunks = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedChunks += chunk;

        // Update UI every 100 characters or so (currently set at 15)
        if (accumulatedChunks.length > 15) {
          streamRef.current += accumulatedChunks;
          setRenderTrigger((prev) => !prev);
          accumulatedChunks = "";
        }
      }

      // Ensure remaining chunks are rendered
      if (accumulatedChunks) {
        streamRef.current += accumulatedChunks;
        setRenderTrigger((prev) => !prev);
        console.log("accumulated chunks:", accumulatedChunks);
      }

      setLoading(false); // Streaming complete
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false); // Ensure loading state is cleared
    }
  }

  return (
    <div>
      <Head>
        <title>Active Recall</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <main className={styles.main}>
        <div
          style={{
            display: "block",
            height: "38px",
            marginBottom: "30px",
            textAlign: "center",
            lineHeight: 1,
          }}
        >
          <p style={{ fontSize: "24px", fontWeight: "700" }}>
            Active Recall - iteration-2
          </p>
          <p style={{ fontSize: "14px" }}>AI Learning Assistant</p>
        </div>
        <div style={{ overflow: "auto", marginTop: "50px" }}>
          {loading ? (
            <>
              <div className={styles.ldsfacebook}>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className={styles.loader}>Generating...</div>
            </>
          ) : (
            <div>{streamRef.current}</div>
          )}
        </div>

        <form onSubmit={(event) => fetchStream(event, inputText)}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              name="Message"
              placeholder="Send a message"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />

            {/* <button type="submit">Send</button> */}
            <VoiceToTranscription />
          </div>
        </form>
      </main>
    </div>
  );
}

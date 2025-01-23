"use client"; // This is a client component
import React, { useState } from "react";
import { useFetchStream } from "../../hooks/useFetchStream";
import Head from "next/head";
import styles from "./page.module.css";
import VoiceToTranscription from "@/components/Voice/VoiceToTranscription";

function Header() {
  return (
    <div
      style={{
        display: "block",
        height: "38px",
        marginBottom: "30px",
        textAlign: "center",
        lineHeight: 1,
      }}
    >
      <p style={{ fontSize: "24px", fontWeight: "700" }}>Active Recall</p>
      <p style={{ fontSize: "14px" }}>AI Learning Assistant</p>
    </div>
  );
}

function Loader() {
  return (
    <div>
      <div className={styles.ldsfacebook}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={styles.loader}>Generating...</div>
    </div>
  );
}

export default function Home() {
  const { loading, stream, fetchStream } = useFetchStream();
  const [inputText, setInputText] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetchStream(inputText);
    setInputText("");
  }

  return (
    <div>
      <Head>
        <title>Active Recall</title>
      </Head>
      <main className={styles.main}>
        <Header />
        <div style={{ overflow: "auto", marginTop: "50px" }}>
          {loading ? <Loader /> : <div>{stream}</div>}
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              name="Message"
              placeholder="Send a message"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button style={{ margin: "5px", padding: "3px" }} type="submit">
              Send Text
            </button>
            <VoiceToTranscription />
          </div>
        </form>
      </main>
    </div>
  );
}

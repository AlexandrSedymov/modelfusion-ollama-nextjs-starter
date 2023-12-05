"use client";
import styles from "./page.module.css";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/codellama",
  });

  const handleClick = () => {
    handleSubmit;
    console.log("Button clicked!");
  };

  return (
    <div className={styles.submitForm}>
      <form onSubmit={handleSubmit}>
        <textarea
          className={styles.inputfield}
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
        <button className={styles.button} type="submit" onClick={handleClick}>
          Submit
        </button>
      </form>

      {messages.map((message) => (
        <div
          key={message.id}
          className="whitespace-pre-wrap"
          style={{ color: message.role === "user" ? "gray" : "black" }}
        >
          {message.role === "user" ? (
            <>
              <strong>{`${message.role}: `}</strong>
              <div className={styles.questionMessage}>{message.content}</div>
            </>
          ) : message.role === "assistant" ? (
            <>
              <strong>{`${message.role}: `}</strong>
              <div className={styles.answerMessage}>{message.content}</div>
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
}

"use client";
import styles from "./page.module.css";
import { useChat } from "ai/react";
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

import { capitalizeFirstLetter } from "../utils/utils";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/codellama",
  });

  const handleClick = () => {
    handleSubmit;
    console.log("Button clicked!");
  };

  const handleKeyDown = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      handleSubmit;
      console.log('Enter key pressed!');
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.todoStyles}>
        <h1>TODO:</h1>
        <li>Create button to switch between coellama and llama2</li>
        <li>Create universal route for codellama amd llama2</li>
        <li>Copy Button for the code sections</li>
        <li>Clean Up</li>
      </div>

      <form onSubmit={handleSubmit} className={styles.submitForm} onKeyDown={handleKeyDown}>
        <textarea
          className={styles.inputfield}
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
          style={{ fontSize: "24px"}}
        />
        <button className={styles.button} type="submit" onClick={handleClick}>
          Submit
        </button>
      </form>

      {messages.map((message) => (
        <div
          key={message.id}
          className="whitespace-pre-wrap"
          style={{ marginBottom: "2rem" }}
        >
          {message.role === "user" ? (
            <>
              <strong style={{ fontSize: "24px"}}>
                {capitalizeFirstLetter(`${message.role}: `)}
              </strong>
              <div className={styles.questionMessage}>
                {message.content}
              </div>
            </>
          ) : message.role === "assistant" ? (
            <>
              <strong style={{ fontSize: "24px"}}>
                {capitalizeFirstLetter(`${message.role}: `)}
              </strong>

              <div className={styles.answerMessage}>
                <Markdown rehypePlugins={[rehypeHighlight]}>
                  {message.content}
                </Markdown>
              </div>
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
}

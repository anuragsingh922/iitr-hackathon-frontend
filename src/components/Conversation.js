import React from "react";
import Message from "./Message";

const Conversation = ({ messages }) => {
  return (
    <div>
      {messages.map((message, index) => (
        <Message
          key={index}
          content={message.content}
          sender={message.sender}
        />
      ))}
    </div>
  );
};

export default Conversation;

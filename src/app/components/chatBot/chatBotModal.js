"use client";
import { useChat } from "ai/react";

const ChatBotModal = () => {
  // Vercel AI SDK (ai package) useChat()
  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat();

  // console.log(messages);
  // console.log(input);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="w-[850px] h-[484px] bg-white rounded-lg shadow-lg flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Chat with Custom GPT</h2>
          <button
            className="text-xl font-bold"
            onClick={() => {
              /* 모달 닫기 로직 추가 */
            }}
          >
            &times;
          </button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id}>
              {/* Name of person talking */}
              {message.role === "assistant" ? (
                <h3 className="text-lg font-semibold mt-2">GPT-4</h3>
              ) : (
                <h3 className="text-lg font-semibold mt-2">User</h3>
              )}

              {/* Formatting the message */}
              {message.content.split("\n").map((currentTextBlock, index) =>
                currentTextBlock === "" ? (
                  <p key={message.id + index}>&nbsp;</p> // Handling empty lines
                ) : (
                  <p key={message.id + index}>{currentTextBlock}</p>
                )
              )}
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200">
          <textarea
            className="w-full h-20 p-2 border border-gray-300 rounded-md"
            placeholder="Type your message here..."
            value={input}
            onChange={handleInputChange}
          />
          <button
            className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotModal;

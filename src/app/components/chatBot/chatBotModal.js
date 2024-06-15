"use client";
import { useChat } from "ai/react";

const ChatBotModal = ({ setIsModalOpen }) => {
  // Vercel AI SDK (ai package) useChat()
  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat();

  // console.log(messages);
  // console.log(input);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="w-[850px] h-[484px] bg-white rounded-lg shadow-lg flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">ACARE 챗봇과 상담해보세요</h2>
          <button
            className="text-xl font-bold"
            onClick={() => {
              setIsModalOpen(false);
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
                <h3 className="text-lg font-semibold mt-2">ACARE</h3>
              ) : (
                <h3 className="text-lg font-semibold mt-2">사용자</h3>
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
            placeholder="어떤 종이, 무슨 증상을 가지고 있는지 말씀해주세요"
            value={input}
            onChange={handleInputChange}
          />
          <button
            className="mt-2 w-full bg-amber-500 text-white py-2 rounded-md hover:bg-amber-600"
            onClick={handleSubmit}
          >
            물어보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotModal;

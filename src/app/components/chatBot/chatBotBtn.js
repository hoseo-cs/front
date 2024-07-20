import { useState } from "react";
import ModalDefault from "../modal/ModalDefault";
import ChatBotModal from "./chatBotModal";

const ChatBotBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClickChatBtn = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <div
        className="w-16 sm:w-20 h-11  fixed  bottom-10 shadow-2xl  right-1 sm:bottom-10 sm:right-10 "
        onClick={onClickChatBtn}
      >
        <img className="w-full" src="/assets/chatbot.png" />
      </div>
      <ModalDefault isOpen={isModalOpen}>
        <ChatBotModal setIsModalOpen={setIsModalOpen} />
      </ModalDefault>
    </div>
  );
};

export default ChatBotBtn;

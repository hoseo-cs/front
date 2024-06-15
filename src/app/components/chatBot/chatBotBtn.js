import { useState } from "react";
import ModalDefault from "../modal/defaultModal";
import ChatBotModal from "./chatBotModal";

const ChatBotBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClickChatBtn = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <div
        className="w-11 h-11 border-solid border-2 border-emerald-500 fixed bottom-0 right-20"
        onClick={onClickChatBtn}
      >
        🗨️
      </div>
      <ModalDefault isOpen={isModalOpen}>
        <ChatBotModal setIsModalOpen={setIsModalOpen} />
      </ModalDefault>
    </div>
  );
};

export default ChatBotBtn;

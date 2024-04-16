import { useEffect, useState } from "react";

const TopButton = () => {
  const [scroll, setScroll] = useState(0);
  const [showBtn, setShowBtn] = useState(false);

  const onScroll = () => {
    setScroll(window.scrollY);
    if (scroll > 100) setShowBtn(true);
    if (scroll < 100) setShowBtn(false);
  };

  const scrollToTop = () => {
    // 페이지 상단으로 스크롤하는 함수
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    setScroll(0);
    setShowBtn(false);
  };
  useEffect(() => {
    onScroll();
  }, [scroll]);

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", onScroll);
    };
    watch();
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    showBtn && (
      <button
        className=" sticky bottom-20 left-full  bg-blue-500 hover:bg-blue-700 rounded"
        onClick={scrollToTop}
      >
        ⏫
      </button>
    )
  );
};

export default TopButton;

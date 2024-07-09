import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchBar = ({ setShowList }) => {
  const [keyword, setKeyword] = useState("");
  const [isCommunityDomain, setIsCommunityDomain] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    if (keyword.trim()) {
      if (isCommunityDomain) {
        router.push(`/community/${keyword}`);
      } else {
        router.push(`/map/${keyword}`);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (window.location.pathname.startsWith("/community")) {
      setIsCommunityDomain(true);
    } else {
      setIsCommunityDomain(false);
    }
  }, []);

  return (
    <div className="flex items-center w-full max-w-md mx-auto my-4 border border-green-500 rounded-full px-4 py-2 shadow-sm">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow focus:outline-none"
        placeholder="병원을 찾고자 하는 지역을 검색해주세요"
      />
      <button
        onClick={handleSearch}
        className="ml-2 text-green-500 focus:outline-none"
      >
        검색
      </button>{" "}
      <button
        onClick={() => setShowList(true)}
        className="ml-2 text-green-700 focus:outline-none"
      >
        주변 병원
      </button>
    </div>
  );
};

export default SearchBar;

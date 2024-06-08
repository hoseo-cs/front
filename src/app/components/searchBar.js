import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (keyword.trim()) {
      router.push(`/community/${keyword}`);
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="border rounded p-2"
        placeholder="검색어를 입력하세요"
      />
      <button
        onClick={handleSearch}
        className="ml-2 bg-blue-500 text-white rounded p-2"
      >
        검색
      </button>
    </div>
  );
};

export default SearchBar;

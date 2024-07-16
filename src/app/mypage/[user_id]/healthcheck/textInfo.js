import { useEffect, useState } from "react";

const TextInfo = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    // 백엔드에서 데이터를 가져오는 로직 (여기서는 더미 데이터를 사용합니다)
    const response = await fetch("/api/health-data"); // 예시 URL
    const result = await response.json();
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // if (!data) {
  //   return (
  //     <div className="flex justify-center items-center h-full">Loading...</div>
  //   );
  // }

  return (
    <div className="flex  justify-around  w-full h-full">
      <form className=" relative flex flex-wrap w-full  bg-white shadow-2xl rounded-2xl p-6 border border-gray-200">
        <div className="w-full md:w-1/2 ">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              이름:
            </label>
            <input
              type="text"
              // value={data.name}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              몸무게:
            </label>
            <input
              type="text"
              // value={`${data.weight}g`}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              처음 만난 곳:
            </label>
            <input
              type="text"
              // value={data.meetingPlace}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              정확한 품종 명:
            </label>
            <input
              type="text"
              // value={data.breed}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              지병:
            </label>
            <input
              type="text"
              // value={data.conditions.join(", ")}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              나이:
            </label>
            <input
              type="text"
              // value={`${data.age}세`}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <div className="text-sm text-gray-500">
              {/* (생일: {data.birthdate}) */}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              복용중인 약:
            </label>
            <input
              type="text"
              // value={data.medications.join(", ")}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        <button className="absolute bottom-2 right-4">업데이트</button>
      </form>
    </div>
  );
};

export default TextInfo;

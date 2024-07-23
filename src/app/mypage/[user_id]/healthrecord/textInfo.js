import { useState } from "react";

const TextInfo = () => {
  const [formData, setFormData] = useState({
    name: "",
    weight: "",
    age: "",
    medications: "",
    meetingPlace: "",
    breed: "",
    disease: "",
  });
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files.length + images.length > 4) {
      alert("최대 4개의 이미지만 업로드할 수 있습니다.");
      return;
    }
    setImages([...images, ...Array.from(e.target.files)]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    } //formData state를 각각 넣어줌

    images.forEach((image) => {
      data.append("images", image);
    });
    console.log("Form Data Submitted: ", formData);

    // try {
    //   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}post`, {
    //     method: "POST",
    //     body: formData,
    //   });

    //   const result = await response.json();
    //   if (result.status === "success") {
    //     alert("건강기록이 성공적으로 업로드되었습니다.");
    //     setImages([]);
    //     router.push(`/mypage/${userId}/posts`);
    //   } else {
    //     alert("게시글 업로드에 실패했습니다.");
    //   }
    // } catch (error) {
    //   console.error("Error uploading post:", error);
    // }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" justify-around  w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-4  px-0 sm: px-3  py-8  "
    >
      {" "}
      <div>
        <div className="w-full sm:aspect-[3/2] rounded-2xl flex flex-col justify-center items-center   bg-pink-100 ">
          사진 추가{" "}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />{" "}
        </div>{" "}
        <div className="w-full sm:w-full my-2 mx-auto flex justify-evenly">
          {images.map((image, index) => (
            <div
              key={index}
              className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] rounded-2xl "
            >
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          ))}
        </div>
      </div>
      <div className=" relative flex flex-wrap w-full  bg-white shadow-2xl rounded-2xl p-6 border border-gray-200">
        <div className="w-full md:w-1/2 ">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              이름:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              몸무게:
            </label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              처음 만난 곳:
            </label>
            <input
              type="text"
              name="meetingPlace"
              value={formData.meetingPlace}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              정확한 품종 명:
            </label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              지병:
            </label>
            <input
              type="text"
              name="disease"
              value={formData.disease}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 sm: px-4">
          <div className="">
            <label className="block text-sm font-medium text-gray-700">
              나이:
            </label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
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
              name="medications"
              value={formData.medications}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        <button type="submit" className="absolute bottom-2 right-4">
          업데이트
        </button>
      </div>
    </form>
  );
};

export default TextInfo;

import { useRouter } from "next/navigation";

const WriteBtn = () => {
  const router = useRouter();
  //const params = useParams();
  //const user_id = params.user_id;

  const user_id = 2333333434;
  return (
    <button
      className="my-2"
      onClick={() => router.push(`/mypage/${user_id}/write`)}
    >
      글 작성하기📝
    </button>
  );
};

export default WriteBtn;

const SignupModal = ({ isSuccess, message }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {isSuccess ? "회원가입 성공" : "회원가입 실패"}
      </h2>
      <p>{message}</p>
    </div>
  );
};

export default SignupModal;

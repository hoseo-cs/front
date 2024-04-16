const TextInfo = () => {
  return (
    <div className="h-full flex justify-around">
      <div className="w-1/2 h-full grid grid-cols-2 gap-6 content-center rounded-2xl  border-2 border-orange-500">
        <div>이름:0000</div>
        <div>몸무게 :0000g</div>
        <div>처음 만난 곳 :0000000병원 </div>
        <div>정확한 품종 명: 00000 000</div>
        <div> 지병: 0000,00000,000</div>
      </div>

      <div className="w-1/3 border-2  grid grid-cols-1 gap-6 content-center rounded-2xl  border-emerald-500">
        <div>
          나이:XX세
          <div>(생일: 0000년 00월 00일)</div>
        </div>
        <div>복용중인 약: 000정,00환,000,00</div>
      </div>
    </div>
  );
};

export default TextInfo;

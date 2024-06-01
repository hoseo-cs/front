export default function signup(req, res) {
  if (req.method === "POST") {
    const { username, password, nickname, pet } = req.body;

    // 목데이터로 회원가입 처리
    if (username && password && nickname && pet) {
      // 성공 응답
      res.status(200).json({ success: true, message: "회원가입 성공" });
    } else {
      // 실패 응답
      res.status(400).json({ success: false, message: "회원가입 실패" });
    }
  } else {
    // 허용되지 않은 메서드
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

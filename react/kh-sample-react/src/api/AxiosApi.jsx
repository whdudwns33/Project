import axios from "axios";
const KH_DOMAIN = "http://localhost:8111";

const AxiosApi = {
  // 정보 조회
  memberCheck: async (name, id, pw, email) => {
    try {
      const response = await axios.get(
        KH_DOMAIN +
          `/users/checkInfo/?name=${name}&id=${id}&pw=${pw}&email=${email}`
      );

      // 서버 응답 데이터를 가져옵니다.
      const data = response.data;

      // 서버 응답 데이터에 따라 "true" 또는 "false"를 도출합니다.
      if (data === "true") {
        return true;
      } else if (data === "false") {
        return false;
      } else {
        // 다른 상황에 대한 처리, 예를 들어 오류 처리
        console.log("서버 응답이 예상한 형식이 아닙니다.");
        return false; // 또는 다른 기본값 또는 오류 처리
      }
    } catch (error) {
      // axios.get() 호출에서 발생한 오류 처리
      console.log("서버 요청 중 오류 발생: ");
      return false; // 오류 처리
    }
  },

  //회원 조회
  memberGet: async (id) => {
    return await axios.get(KH_DOMAIN + `/users/member/?name=${id}`);
  },

  // 회원 탈퇴
  memberDel: async (id) => {
    const del = {
      id: id,
    };
    return await axios.post(KH_DOMAIN + "/user/delete", del);
  },
};
export default AxiosApi;

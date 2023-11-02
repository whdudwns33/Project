import axios from "axios";
const KH_DOMAIN = "http://localhost:8111";

const AxiosApi = {
  // 정보 조회
  memberCheck: async (name, id, pw, email) => {
    return await axios.get(
      KH_DOMAIN +
        `/users/checkInfo/?name=${name}&id=${id}&pw=${pw}&email=${email}`
    );
  },

  handleIdChange: async (currentId, newId) => {
    try {
      // 준비된 데이터를 객체로 만들지 않고, 각각의 매개변수로 전달합니다.
      const updateId = {
        currentId: currentId,
        newId: newId,
      };
      console.log("현제 아이디" + currentId);
      console.log("새로운 아이디" + newId);
      // POST 요청을 보냅니다.
      return await axios.post(KH_DOMAIN + "/users/updateId", updateId);
    } catch (error) {
      // 오류 처리: 서버 요청 중 오류 발생 시, 적절한 대응이 필요합니다.
      console.error("ID 변경 중 오류 발생:", error);
      throw error; // 나중에 오류를 처리하기 위해 다시 throw합니다.
    }
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

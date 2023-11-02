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

  modifyID: async (currentId, newId) => {
    try {
      const updateId = {
        currentId: currentId,
        newId: newId,
      };
      console.log("현제 아이디" + currentId);
      console.log("새로운 아이디" + newId);
      // POST 요청을 보냅니다.
      return await axios.post(KH_DOMAIN + "/users/updateId", updateId);
    } catch (error) {
      console.error("ID 변경 중 오류 발생:", error);
      throw error; 
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

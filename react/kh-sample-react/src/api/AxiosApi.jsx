import axios from "axios";
const KH_DOMAIN = "http://localhost:8111";

const AxiosApi = {
  // 정보 조회
  memberCheck: async (name, id, pw, email) => {
    return await axios.get(KH_DOMAIN + `/users/checkInfo/?name=${name}&id=${id}&pw=${pw}&email=${email}`);
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

package com.book.gpt.controller;
import com.book.gpt.dao.MemberDAO;
import com.book.gpt.dto.MemberDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
// 포스트는 프론트엔드에서 정보를 날리는 방식
// @PostMapping/ @DeleteMaping은 큰 차이가 없다

public class MemberController {
    // 회원 정보 조회
    @GetMapping("/member")
    public ResponseEntity<List<MemberDTO>> memberList(@RequestParam String id) {
        System.out.println("id : " + id);
        MemberDAO dao = new MemberDAO();
        List<MemberDTO> list = dao.memberInfo(id);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    // 입력 받은 이름, 아이디, 비밀번호, 이메일로 정보 조회
    @GetMapping("/checkInfo")
    public ResponseEntity<Boolean> memberCheck(@RequestParam String name,@RequestParam String id,@RequestParam String pw,@RequestParam String email) {
        MemberDAO dao = new MemberDAO();
        boolean isTrue = dao.memberCheck(name, id, pw, email);
        return new ResponseEntity<>(isTrue, HttpStatus.OK);
    }
    // 아이디 변경
    @PostMapping("/updateId")
    public ResponseEntity<Boolean> updateId (@RequestBody Map<String, String> updateId) {
        String currentId = updateId.get("currentId");
        String newId = updateId.get("newId");
        MemberDAO dao = new MemberDAO();
        boolean isTrue = dao.modifyId(currentId, newId);
        System.out.println(isTrue);
        return new ResponseEntity<>(isTrue, HttpStatus.OK);
    }
    // 비밀번호 변경
    @PostMapping("/updatePw")
    public ResponseEntity<Boolean> updatePw (@RequestBody Map<String, String> updatePw) {
        // 프론트엔드의 aixos의 키값과 동일한 이름일 것
        String currentPw = updatePw.get("currentPw");
        String newPw = updatePw.get("newPw");
        MemberDAO dao = new MemberDAO();
        boolean isTrue = dao.modifyPw(currentPw, newPw);
        System.out.println(isTrue);
        return new ResponseEntity<>(isTrue, HttpStatus.OK);
    }
    // 정보 삭제, 회원탈퇴
    @PostMapping("/delete")
    public ResponseEntity<Boolean> deleteMember (@RequestBody Map<String, String> del) {
        String getId = del.get("delId");
        MemberDAO dao = new MemberDAO();
        boolean isTrue = dao.deleteMember(getId);
        System.out.println("삭제여부 : " + isTrue);
        return new ResponseEntity<>(isTrue, HttpStatus.OK);
    }
    // 금액 충전
    @PostMapping("/charge")
    public ResponseEntity<Boolean> chargeCash (@RequestBody Map<String, Object> charge) {
        String getId = (String) charge.get("id");
        int getCash = (int) charge.get("cash");
        MemberDAO dao = new MemberDAO();
        boolean isTrue = dao.chargingCash(getId, getCash);
        System.out.println("충전 여부" + isTrue);
        return new ResponseEntity<>(isTrue, HttpStatus.OK);
    }



}


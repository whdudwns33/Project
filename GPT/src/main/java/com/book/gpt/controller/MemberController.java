package com.book.gpt.controller;
import com.book.gpt.dao.MemberDAO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")

public class MemberController {
    @GetMapping("/checkInfo")
    public ResponseEntity<Boolean> memberCheck(@RequestParam String name, String id, String pw, String email) {
        System.out.println("회원 가입 여부 확인 Name : " + name);
        System.out.println("회원 가입 여부 확인 ID : " + id);
        System.out.println("회원 가입 여부 확인 ID : " + pw);
        System.out.println("회원 가입 여부 확인 ID : " + email);
        MemberDAO dao = new MemberDAO();
        boolean isTrue = dao.memberCheck(name, id, pw, email);
        Map<String, Boolean> response = new HashMap<>();
        response.put("result", isTrue);
        return new ResponseEntity<>(isTrue, HttpStatus.OK);
    }
}

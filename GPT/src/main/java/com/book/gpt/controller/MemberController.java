package com.book.gpt.controller;

import com.book.gpt.JWT.JwtAuthorizationFilter;
import com.book.gpt.dao.MemberDAO;
import com.book.gpt.dao.MemberDAO2;
import com.book.gpt.dto.MemberDTO;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin("*")
@RestController
@RequestMapping("/users")
public class MemberController {
    @Value("${jwt.secret}") // application.properties에서 설정 가져오기
    private String jwtSecretKey;
    @Autowired
    private JwtAuthorizationFilter jwtAuthorizationFilter;
    @Autowired
    private MemberDAO2 dao;   // Add this line

    @Autowired
    private PasswordEncoder passwordEncoder;   // Add this line

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<String> memberLogin(@RequestBody Map<String, String> loginData) {
        String id = loginData.get("id");
        String pwd = loginData.get("password");

//        MemberDTO user = dao.findId(id);


        boolean loginResult = dao.loginCheck(id, pwd);
        System.out.println(loginResult);
        if (loginResult) {
            // 로그인 성공 시 토큰 생성
            String role = dao.findRoleById(id); // 사용자의 권한 정보를 가져옴
            System.out.println(role);
            String token = jwtAuthorizationFilter.generateToken(id, role);
            // 클라이언트에게 토큰 반환
            return new ResponseEntity<>(token, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("", HttpStatus.OK);
        }
    }


    @PostMapping("/logout")
    public ResponseEntity<String> memberLogout(HttpServletRequest request) {
        String token = jwtAuthorizationFilter.extractTokenFromRequest(request);

        if (token != null) {
            return new ResponseEntity<>("Logged out successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User is not logged in", HttpStatus.OK);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<MemberDTO> getUserInfo(@PathVariable("id") String id) {
        MemberDTO userInfo = dao.getUserInfo(id);
        return new ResponseEntity<>(userInfo, HttpStatus.OK);
    }

    @PostMapping("/signup/check-duplicate")
    public ResponseEntity<Boolean> checkDuplicate(@RequestBody MemberDTO memberDTO) {
        boolean isDuplicate = dao.signupCheck(memberDTO.getId(), memberDTO.getEmail(), memberDTO.getTel());

        if (isDuplicate) {
            System.out.println("중복된 아이디, 이메일, 전화 번호가 존재합니다 ");
        }

        return new ResponseEntity<>(!isDuplicate, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<Boolean> memberSignup(@RequestBody MemberDTO memberDTO) {
        // 비밀번호를 해싱해서 저장
        String plainPassword =  memberDTO.getPassword();
        memberDTO.setPassword(dao.hashPassword(plainPassword)); // 해싱된 비밀번호를 저장

        // 회원 가입을 수행
        memberDTO.setName("user");
        memberDTO.setCash(0);
        memberDTO.getProfileUrl();
        boolean regResult = dao.signup(memberDTO);
        memberDTO.setRole("ROLE_USER");
        System.out.println(memberDTO.getRole());

        return new ResponseEntity<>(regResult, HttpStatus.OK);
    }


    @GetMapping("/check-login")
    public ResponseEntity<Map<String, Object>> checkLogin(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            // 클라이언트에서 전송한 Authorization 헤더에서 토큰을 추출
            String clientToken = authorizationHeader.substring("Bearer ".length());
            if (clientToken != null) {
                // 백엔드에서 생성한 토큰과 클라이언트 토큰을 비교하여 유효한 토큰인지 확인
                if (isValidToken(clientToken)) {
                    // 토큰이 유효하다면 로그인 상태
                    String id = jwtAuthorizationFilter.getIdFromToken(clientToken); // 토큰에서 사용자 ID 추출
                    MemberDTO user = dao.findId(id); // 사용자 정보 조회
                    Map<String, Object> response = new HashMap<>();
                    response.put("message", "User is logged in");
                    response.put("user", user);
                    return new ResponseEntity<>(response, HttpStatus.OK);
                }
            }

            // 토큰이 없거나 유효하지 않다면 비로그인 상태
            return new ResponseEntity<>(Collections.singletonMap("message", "User is not logged in"), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.singletonMap("message", "Error occurred"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    private boolean isValidToken(String clientToken) {
        try {
            if (!isValidFormat(clientToken)) {
                return false;
            }
            // 백엔드에서 사용한 비밀키를 사용하여 토큰을 검증
            SecretKey key = Keys.hmacShaKeyFor(jwtSecretKey.getBytes());
            System.out.println(key);
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(clientToken);

            return true; // 토큰이 유효하면 true 반환
        } catch (Exception e) {
            return false; // 토큰이 유효하지 않으면 false 반환
        }
    }
    public boolean isValidFormat(String token) {
        String[] parts = token.split("\\.");
        return parts.length == 3;
    }


    // 조영준
    // 회원 정보 조회
    @GetMapping("/member")
    public ResponseEntity<List<MemberDTO>> memberList(@RequestParam String id) {
        System.out.println("id : " + id);
        MemberDAO dao = new MemberDAO();
        List<MemberDTO> list = dao.memberInfo(id);
        for (MemberDTO member : list) {
            System.out.println("Id: " + member.getId());
            System.out.println("Password: " + member.getPassword());
            System.out.println("Name: " + member.getName());
            System.out.println("Email: " + member.getEmail());
            System.out.println("Tel: " + member.getTel());
            System.out.println("Cash: " + member.getCash());
            System.out.println("Role: " + member.getRole());
            System.out.println("-----------------------------");
        }
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
        System.out.println("아이디 최종 변경" + isTrue);
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
    @PostMapping("/updateName")
    public ResponseEntity<Boolean> updateName (@RequestBody Map<String, String> updateName) {
        String currentName = updateName.get("currentName");
        String newName = updateName.get("newName");
        MemberDAO dao = new MemberDAO();
        boolean isTrue = dao.modifyName(currentName, newName);
        System.out.println("이름 변경 체크 :" + isTrue);
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

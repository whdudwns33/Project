package com.book.gpt.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
//import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MemberDTO {
    private String id;
    private String password;
    private String name;
    private String email;
    private String tel;
    private int cash;
    private int auth;
//    private Collection<? extends GrantedAuthority> authorities; // 권한 정보
    private String role;
    private String profileUrl;
}

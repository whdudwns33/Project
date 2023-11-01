package com.book.gpt.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDTO {
    private String name;
    private String id;
    private String password;
    private String email;
    private String tel;
    private int cash;
    private String auth;
}
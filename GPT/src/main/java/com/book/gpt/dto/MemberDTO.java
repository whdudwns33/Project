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

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public void setCash(int cash) {
        this.cash = cash;
    }
}
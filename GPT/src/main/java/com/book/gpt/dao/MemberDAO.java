package com.book.gpt.dao;
import com.book.gpt.common.Common;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;


public class MemberDAO {

    private Connection conn = null;
    private Statement stmt = null;
    private ResultSet rs = null;
    private PreparedStatement pStmt = null;


    public boolean memberCheck(String name, String id, String pw, String email) {
        boolean isChecked = false;
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT NAME, ID, PASSWORD, EMAIL FROM MEMBER WHERE NAME = '" + name + "'"
                    + " AND ID = '" + id + "'"
                    + " AND PASSWORD = '" + pw + "'"
                    + " AND EMAIL = '" + email + "'";
            rs = stmt.executeQuery(sql);
            System.out.println("회원 가입 여부 확인 Name : " + name);
            System.out.println("회원 가입 여부 확인 ID : " + id);
            System.out.println("회원 가입 여부 확인 ID : " + pw);
            System.out.println("회원 가입 여부 확인 ID : " + email);
            if(rs.next()) isChecked = true;
            else isChecked = false;
            System.out.println(isChecked);
        } catch(Exception e) {
            e.printStackTrace();
        }
        Common.close(rs);
        Common.close(stmt);
        Common.close(conn);
        return isChecked;
    }
}

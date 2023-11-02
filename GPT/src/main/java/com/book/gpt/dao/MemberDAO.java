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

    public boolean isIdcheck(String newId) {
        // 중복 체크
        boolean isDup = false;
        try {
            conn = Common.getConnection();
            String checkSql = "SELECT COUNT(*) AS count FROM MEMBER WHERE ID = ?";
            PreparedStatement pstmt = conn.prepareStatement(checkSql);
            pstmt.setString(1, newId);
            ResultSet resultSet = pstmt.executeQuery();
            if (resultSet.next()) {
                int count = resultSet.getInt("count");
                if (count == 0) {
                    System.out.println(isDup);
                    isDup = true;
                } else {
                    System.out.println(isDup);
                    isDup = false;
                }
            }
            System.out.println(isDup);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return isDup;
    }

    public boolean changeData( String currentId, String newId) {
        boolean isData = false;
        try {
            conn = Common.getConnection();
            // 아이디 변경을 위한 SQL 쿼리를 작성합니다.
            String updateSql = "UPDATE MEMBER SET ID = ? WHERE ID = ?";
            if (isIdcheck(newId) == true) {
                // PreparedStatement를 생성하고 파라미터 값을 설정합니다.
                PreparedStatement pstmt = conn.prepareStatement(updateSql);
                pstmt.setString(1, newId);
                pstmt.setString(2, currentId);

                // 업데이트 쿼리를 실행합니다.
                int rowsUpdated = pstmt.executeUpdate();
                if (rowsUpdated > 0) {
                    isData = true;
                    System.out.println("아이디 변경 완료");
                } else {
                    isData = false;
                    System.out.println("아이디 변경 실패");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    return isData;
    }
}

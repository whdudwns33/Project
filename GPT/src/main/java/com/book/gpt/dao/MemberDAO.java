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
            String sql = "SELECT NAME, ID, PASSWORD, EMAIL FROM MEMBER WHERE NAME = " + "'" + name +"'"
                    + "AND ID =" + "'" + id +"'"
                    + "AND PASSWORD =" + "'" + pw +"'"
                    + "AND EMAIL = " + "'" + email +"'";
            rs = stmt.executeQuery(sql);
            if(rs.next()) isChecked = false;
            else isChecked = true;
        } catch(Exception e) {
            e.printStackTrace();
        }
        Common.close(rs);
        Common.close(stmt);
        Common.close(conn);
        return isChecked; // 가입 되어 있으면 false, 가입이 안되어 있으면 true
    }
}

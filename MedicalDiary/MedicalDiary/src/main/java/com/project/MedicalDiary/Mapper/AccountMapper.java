package com.project.MedicalDiary.Mapper;

import com.project.MedicalDiary.Model.Account;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AccountMapper implements RowMapper<Account> {

    public static final String BASE_SQL = "select * from account";


    @Override
    public Account mapRow(ResultSet rs, int rowNum) throws SQLException {

        String Username = rs.getString("UserName");
        String Password = rs.getString("PassWord");
        String Email = rs.getString("Email");
        int Permission = rs.getInt("Permission");

        return new Account(Username, Password, Email, Permission);
    }
}


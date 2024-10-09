package com.project.MedicalDiary.Mapper;

import com.project.MedicalDiary.Model.Account;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AccountMapper implements RowMapper<Account> {

    public static final String BASE_SQL = "select * from account";


    @Override
    public Account mapRow(ResultSet rs, int rowNum) throws SQLException {

        Long ID_Family = rs.getLong("ID_Family");
        String Password = rs.getString("PassWord");
        String Email = rs.getString("Email");


        return new Account(ID_Family, Password, Email);
    }
}


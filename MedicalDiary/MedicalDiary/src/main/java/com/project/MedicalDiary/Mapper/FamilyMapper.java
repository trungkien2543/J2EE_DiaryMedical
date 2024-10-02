package com.project.MedicalDiary.Mapper;

import com.project.MedicalDiary.Model.Family;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class FamilyMapper implements RowMapper<Family> {
    @Override
    public Family mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Family(
                rs.getLong("ID_Family"), // ID_Family
                rs.getString("Name")     // Name
        );
    }

}

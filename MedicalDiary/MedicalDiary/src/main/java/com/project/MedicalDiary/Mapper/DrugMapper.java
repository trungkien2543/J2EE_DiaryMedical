package com.project.MedicalDiary.Mapper;

import com.project.MedicalDiary.Model.Drug;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class DrugMapper implements RowMapper<Drug> {
    @Override
    public Drug mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Drug(
                rs.getString("ID_Drug"),      // ID_Drug
                rs.getString("Name_Drug"),    // Name_Drug
                rs.getString("Description"),   // Description
                rs.getDouble("Price")         // Price
        );
    }

}

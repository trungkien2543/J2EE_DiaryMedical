package com.project.MedicalDiary.Mapper;

import com.project.MedicalDiary.Model.Information;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class InformationMapper implements RowMapper<Information> {
    public static final String BASE_SQL = "SELECT * FROM information";


    @Override
    public Information mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Information(
                rs.getString("CCCD"),                     // CCCD
                rs.getString("Name"),                     // Name
                rs.getBoolean("Gender"),                  // Gender
                rs.getString("BHYT"),                     // BHYT
                rs.getString("Phone"),                    // Phone
                rs.getString("Job"),                      // Job
                rs.getString("Department"),               // Department
                rs.getString("Address"),                  // Address
                rs.getString("Medical_History"),          // Medical History
                rs.getLong("ID_Family")                   // ID_Family
        );
    }

}

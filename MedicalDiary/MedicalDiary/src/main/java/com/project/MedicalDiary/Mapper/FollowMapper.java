package com.project.MedicalDiary.Mapper;

import com.project.MedicalDiary.Model.Follow;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class FollowMapper implements RowMapper<Follow> {
    @Override
    public Follow mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Follow(
                rs.getString("ID_Follow"),        // ID_Follow
                rs.getString("ID_IsFollowed"),    // ID_IsFollowed
                rs.getBoolean("Is_delete")        // Is_delete
        );
    }

}

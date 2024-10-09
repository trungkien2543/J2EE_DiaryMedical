package com.project.MedicalDiary.Mapper;

import com.project.MedicalDiary.Model.RoomDetail;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RoomDetailMapper implements RowMapper<RoomDetail> {


    public static final String BASE_SQL = "select * from room_detail";

    @Override
    public RoomDetail mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new RoomDetail(rs.getString("ID_Room"),rs.getString("ID_IsFollowed"),rs.getInt("Status"));
    }
}

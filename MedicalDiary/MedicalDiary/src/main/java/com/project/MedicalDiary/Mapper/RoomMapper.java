package com.project.MedicalDiary.Mapper;


import com.project.MedicalDiary.Model.Room;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RoomMapper implements RowMapper<Room> {

    public static final String BASE_SQL = "select * from room";

    @Override
    public Room mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Room(rs.getString("iD_Room"),rs.getString("PIN"));
    }
}

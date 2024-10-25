//package com.project.MedicalDiary.RepositoryOld;
//
//import com.project.MedicalDiary.Mapper.RoomMapper;
//import com.project.MedicalDiary.Model.Room;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.jdbc.core.support.JdbcDaoSupport;
//import org.springframework.stereotype.Repository;
//import org.springframework.transaction.annotation.Transactional;
//
//import javax.sql.DataSource;
//import java.util.List;
//
//@Repository
//@Transactional
//public class RoomRepository extends JdbcDaoSupport {
//    @Autowired
//    public RoomRepository(DataSource dataSource) {
//        this.setDataSource(dataSource);
//    }
//    public Room createRoom(Room room) {
//        String sql = "INSERT INTO Room (Id_Room, PIN) VALUES (?, ?)";
//        Object[] params = new Object[]{room.getId_Room(), room.getPIN()};
//        int rowsAffected = this.getJdbcTemplate().update(sql, params);
//        if (rowsAffected > 0) {
//            return room;
//        }
//        return null;
//    }
//
//    public List<Room> getAll() {
//        String sql = "SELECT * FROM Room";
//        List<Room> listRooms = this.getJdbcTemplate().query(sql, new RoomMapper());
//        return listRooms;
//    }
//
//    public Boolean deleteRoom(Room room) {
//        String sql = "DELETE FROM Room WHERE iD_Room = ?";
//        Object[] params = new Object[]{room.getId_Room()};
//        int rowsAffected = this.getJdbcTemplate().update(sql, params);
//        return rowsAffected > 0;
//    }
//
//    public Boolean updateRoom(Room room) {
//        String sql = "UPDATE Room SET PIN = ? WHERE iD_Room = ?";
//        Object[] params = new Object[]{room.getPIN(), room.getId_Room()};
//        int rowsAffected = this.getJdbcTemplate().update(sql, params);
//        return rowsAffected > 0;
//    }
//    public List<Room> getRoomByIDRoom(String IdRoom) { //CCCD
//        String sql = "SELECT * FROM Room WHERE iD_Room = ?";
//
//        Object[] params = new Object[]{IdRoom};
//        List<Room> listRooms = this.getJdbcTemplate().query(sql, params, new RoomMapper());
//
//        return listRooms;
//    }
//
//
//}

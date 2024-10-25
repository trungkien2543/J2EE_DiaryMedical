//package com.project.MedicalDiary.RepositoryOld;
//import javax.sql.DataSource;
//
//import com.project.MedicalDiary.Mapper.RoomDetailMapper;
//import com.project.MedicalDiary.Model.RoomDetail;
//import jakarta.transaction.Transactional;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.jdbc.core.support.JdbcDaoSupport;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//
//@Repository
//@Transactional
//public class RoomDetailRepository extends JdbcDaoSupport {
//
//    @Autowired
//    public RoomDetailRepository(DataSource dataSource) {
//        this.setDataSource(dataSource);
//    }
//
//    public Boolean createRoomDetail(RoomDetail roomDetail) {
//        String sql = "INSERT INTO RoomDetail (ID_Room, ID_isFollewed, Status) VALUES (?, ?, ?)";
//        Object[] params = new Object[]{roomDetail.getID_Room(), roomDetail.getID_isFollewed(), roomDetail.getStatus()};
//        int rowsAffected = this.getJdbcTemplate().update(sql, params);
//        return rowsAffected > 0;
//    }
//
//    public List<RoomDetail> getAllRoomDetails() {
//        String sql = "SELECT * FROM RoomDetail";
//        List<RoomDetail> listRoomDetails = this.getJdbcTemplate().query(sql, new RoomDetailMapper());
//        return listRoomDetails;
//    }
//
//    public boolean deleteRoomDetail(RoomDetail RoomDetail) {
//        String sql = "DELETE FROM RoomDetail WHERE ID_Room = ?";
//        Object[] params = new Object[]{RoomDetail.getID_Room()};
//        int rowsAffected = this.getJdbcTemplate().update(sql, params);
//        return rowsAffected > 0;
//    }
//
//    public Boolean updateRoomDetail(RoomDetail roomDetail) {
//        String sql = "UPDATE RoomDetail SET ID_isFollewed = ?, Status = ? WHERE ID_Room = ?";
//        Object[] params = new Object[]{roomDetail.getID_isFollewed(), roomDetail.getStatus(), roomDetail.getID_Room()};
//        int rowsAffected = this.getJdbcTemplate().update(sql, params);
//        return rowsAffected > 0;
//    }
//    public List<RoomDetail> getAllRoomDetailsByIdRoom(String idRoom) {
//        String sql = "SELECT * FROM RoomDetail WHERE iD_Room = ?";
//
//        Object[] params = new Object[]{idRoom};
//        List<RoomDetail> listRoomDetails = this.getJdbcTemplate().query(sql, params, new RoomDetailMapper());
//
//        return listRoomDetails;
//    }
//
//
//
//}

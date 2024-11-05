package com.project.MedicalDiary.Repository;

import com.project.MedicalDiary.Entity.RoomDetail;
import com.project.MedicalDiary.Entity.RoomDetailId;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.List;

@Repository
public interface RoomDetailRepository extends JpaRepository<RoomDetail, RoomDetailId> {
    List<RoomDetail> findByRoom_IDRoom(String idRoom);
    List<RoomDetail> findByisFollowed_CCCD(String cccd);
    // Update the status of RoomDetail based on IDRoom and IDisFollowed
    @Modifying
    @Transactional
    @Query("UPDATE RoomDetail rd SET rd.status = ?2 WHERE rd.room.IDRoom = ?1 AND rd.isFollowed.CCCD = ?3") // Use Status
    int updateStatus(String idRoom, int Status, String idIsFollowed);

    @Query("SELECT CASE WHEN COUNT(rd) > 0 THEN TRUE ELSE FALSE END FROM RoomDetail rd WHERE rd.ID.IDRoom = :idRoom")
    boolean existsByIDRoom(@Param("idRoom") String idRoom);

    List<RoomDetail> findByRoom_IDRoomAndStatus(String IDRoom,int Status); // Use Status
    List<RoomDetail> findByIsFollowed_CCCDAndStatus(String cccd,int Status);
}

package com.project.MedicalDiary.Repository;

import com.project.MedicalDiary.Entity.RoomDetail;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomDetailRepository extends JpaRepository<RoomDetail, String> {
    List<RoomDetail> findByRoom_IDRoom(String idRoom);
    List<RoomDetail> findByisFollowed_CCCD(String cccd);
    // Update the status of RoomDetail based on IDRoom and IDisFollowed
    @Modifying
    @Transactional
    @Query("UPDATE RoomDetail rd SET rd.Status = ?2 WHERE rd.room.IDRoom = ?1 AND rd.isFollowed.CCCD = ?3") // Use Status
    int updateStatus(String idRoom, int Status, String idIsFollowed);

//    List<RoomDetail> findByIDRoomAndStatus(String IDRoom, int Status); // Use Status
}

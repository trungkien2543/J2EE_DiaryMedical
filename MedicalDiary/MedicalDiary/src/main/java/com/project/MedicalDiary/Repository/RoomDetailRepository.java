package com.project.MedicalDiary.Repository;

import com.project.MedicalDiary.Entity.RoomDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomDetailRepository extends JpaRepository<RoomDetail, Long> {
    List<RoomDetail> findByIDRoom(String idRoom);
    List<RoomDetail> findByIDisFollowed(String idRoom);
}

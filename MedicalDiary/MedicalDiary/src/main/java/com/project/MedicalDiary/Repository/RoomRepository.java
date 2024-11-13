package com.project.MedicalDiary.Repository;

import com.project.MedicalDiary.Entity.Room;
import org.springframework.data.jpa.repository.JpaRepository; //JPA
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByIDRoom(String idRoom);
}
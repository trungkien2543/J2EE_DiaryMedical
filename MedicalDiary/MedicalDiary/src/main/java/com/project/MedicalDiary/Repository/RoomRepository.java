package com.project.MedicalDiary.Repository;

import com.project.MedicalDiary.Entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByIDRoom(String idRoom);
    Optional<Room> findByIDRoomAndPIN(String IDRoom, String PIN);
}
package com.project.MedicalDiary.Service;

import com.project.MedicalDiary.Model.Room;
import com.project.MedicalDiary.Repository.RoomRepository;
import com.project.MedicalDiary.Service.Imp.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomServiceImp implements RoomService {

    private final RoomRepository roomRepository;

    @Autowired
    public RoomServiceImp(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }
    @Override
    public Boolean createRoom(Room room) {
        return roomRepository.createRoom(room);
    }

    @Override
    public List<Room> getAll() {
        return roomRepository.getAll();
    }

    @Override
    public Boolean deleteRoom(Room room) {
        return roomRepository.deleteRoom(room);
    }

    @Override
    public Boolean updateRoom(Room room) {
        return roomRepository.updateRoom(room);
    }

    @Override
    public List<Room> getRoomByIDFamily(Room room) {
        return roomRepository.getRoomByIDFamily(room);
    }
}

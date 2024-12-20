package com.project.MedicalDiary.Service.Imp;

import com.project.MedicalDiary.Entity.Information;
import com.project.MedicalDiary.Entity.Room;
import com.project.MedicalDiary.Repository.RoomRepository;
import com.project.MedicalDiary.Service.ImpInterface.RoomService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class RoomServiceImp implements RoomService {

    private final RoomRepository roomRepository;

    @Autowired
    public RoomServiceImp(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Override
    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    @Override
    public List<Room> getAll() {
        return roomRepository.findAll();
    }

    @Override
    public Boolean deleteRoom(Room room) {
        if (roomRepository.existsById(room.getIDRoom())) {
            roomRepository.delete(room);
            return true; // Deletion successful
        }
        return false; // Room does not exist
    }

    @Override
    public Room updateRoom(Room room) {
        return roomRepository.save(room);
    }

    @Override
    public List<Room> getRoomByIDRoom(String idRoom) {
        return roomRepository.findByIDRoom(idRoom);
    }

    @Override
    public Map<Information, Room> mapRoomsToMembers(Iterable<Information> listInfoOfFml, Iterable<Room> listRoom) {
        Map<Information, Room> mapping = new HashMap<>();

        // Assuming there's a logic to map Information to Room
        // For example, you might want to map them based on some shared attribute
        for (Information info : listInfoOfFml) {
            for (Room room : listRoom) {
                // Add your mapping condition here
                // Example condition (you can adjust as necessary):
                if (info.getCCCD().equals(room.getIDRoom())) { // This is a placeholder condition
                    mapping.put(info, room);
                }
            }
        }

        return mapping;
    }
    @Override
    public Boolean checkRoom(String IDRoom, String PIN) {
        Optional<Room> room = roomRepository.findByIDRoomAndPIN(IDRoom, PIN);
        return room.isPresent();
    }

    @Override
    public Room getRoomByID(String IDRoom) {
        return roomRepository.findRoomByIDRoom(IDRoom);
    }
    @Override
    public Boolean changePIN(String IDRoom, String oldPIN, String newPIN) {
        Optional<Room> room = roomRepository.findByIDRoomAndPIN(IDRoom, oldPIN);
        if (room.isPresent()) {
            Room roomToUpdate = room.get();
            roomToUpdate.setPIN(newPIN);
            roomRepository.save(roomToUpdate);
            return true;
        }
        return false;
    }
    @Override
    public Boolean setupPIN(String IDRoom, String newPIN) {
        // Tìm phòng theo IDRoom
        Optional<Room> roomOptional = roomRepository.findById(IDRoom);

        if (roomOptional.isPresent()) {
            Room room = roomOptional.get();

            // Kiểm tra nếu phòng chưa có PIN
            if (!(room.getPIN() == null || room.getPIN().isEmpty())) {
                room.setPIN(newPIN); // Thiết lập PIN mới
                roomRepository.save(room); // Lưu thay đổi
                return true;
            } else {
                // Nếu PIN đã tồn tại, không cho phép thiết lập lại
                throw new IllegalStateException("PIN is already set for this room.");
            }
        } else {
            throw new EntityNotFoundException("Room not found with ID: " + IDRoom);
        }
    }


    @Override
    public Boolean existByIDRoom(String IDRoom) {
        return roomRepository.existsByIDRoom(IDRoom);
    }
    @Override
    public Boolean deleteRoomByIDRoom(String IDRoom) {
        Room room = roomRepository.findRoomByIDRoom(IDRoom);
        return deleteRoom(room);
    }

    @Override
    public Boolean comparePin(String pin,String cccd){
        List<Room> a = roomRepository.findByIDRoom(cccd);
        for(Room r : a) {
            if (r.getPIN().equals(pin)) {
                return true;

            }
        }
        return false;
    }
}


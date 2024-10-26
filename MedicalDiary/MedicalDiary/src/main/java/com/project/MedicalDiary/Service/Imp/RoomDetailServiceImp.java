package com.project.MedicalDiary.Service.Imp;

import com.project.MedicalDiary.Entity.RoomDetail;
import com.project.MedicalDiary.Repository.RoomDetailRepository;
import com.project.MedicalDiary.Service.ImpInterface.RoomDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomDetailServiceImp implements RoomDetailService {

    private final RoomDetailRepository roomDetailRepository;

    @Autowired
    public RoomDetailServiceImp(RoomDetailRepository roomDetailRepository) {
        this.roomDetailRepository = roomDetailRepository;
    }

    @Override
    public RoomDetail createRoomDetail(RoomDetail roomDetail) {
        return roomDetailRepository.save(roomDetail);
    }

    @Override
    public List<RoomDetail> getAllRoomDetails() {
        return roomDetailRepository.findAll();
    }

    @Override
    public Boolean deleteRoomDetail(RoomDetail roomDetail) {
        if (roomDetailRepository.existsById(Long.valueOf(roomDetail.getIDRoom()))) {
            roomDetailRepository.delete(roomDetail);
            return true; // Deletion successful
        }
        return false; // RoomDetail does not exist
    }

    @Override
    public RoomDetail updateRoomDetail(RoomDetail roomDetail) {
        return roomDetailRepository.save(roomDetail);
    }

    @Override
    public List<RoomDetail> getAllRoomDetailsByRoomID(String idRoom) {
        return roomDetailRepository.findByIDRoom(idRoom);
    }
}

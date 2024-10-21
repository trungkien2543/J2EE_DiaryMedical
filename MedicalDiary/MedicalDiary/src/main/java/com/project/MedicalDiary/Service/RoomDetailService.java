package com.project.MedicalDiary.Service;

import com.project.MedicalDiary.Model.RoomDetail;
import com.project.MedicalDiary.Repository.InformationRepository;
import com.project.MedicalDiary.Repository.RoomDetailRepository;
import com.project.MedicalDiary.Service.Imp.RoomDetailServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomDetailService implements RoomDetailServiceImp {
    private final RoomDetailRepository  roomDetailRepository;

    @Autowired
    public RoomDetailService( RoomDetailRepository roomDetailRepository) {
        this.roomDetailRepository = roomDetailRepository;
    }
    @Override
    public Boolean createRoomDetail(RoomDetail roomDetail) {
        return roomDetailRepository.createRoomDetail(roomDetail);
    }

    @Override
    public List<RoomDetail> getAllRoomDetails() {
        return roomDetailRepository.getAllRoomDetails();
    }

    @Override
    public Boolean deleteRoomDetail(RoomDetail roomDetail) {
        return roomDetailRepository.deleteRoomDetail(roomDetail);
    }

    @Override
    public Boolean updateRoomDetail(RoomDetail roomDetail) {
        return roomDetailRepository.updateRoomDetail(roomDetail);
    }

    @Override
    public List<RoomDetail> getAllRoomDetailsByRoomID(String idRoom) {
        return roomDetailRepository.getAllRoomDetailsByIdRoom(idRoom);
    }
}

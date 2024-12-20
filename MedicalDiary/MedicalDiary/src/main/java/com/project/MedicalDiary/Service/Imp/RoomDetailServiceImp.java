package com.project.MedicalDiary.Service.Imp;

import com.project.MedicalDiary.Entity.Information;
import com.project.MedicalDiary.Entity.RoomDetail;
import com.project.MedicalDiary.Entity.RoomDetailId;
import com.project.MedicalDiary.Repository.InformationRepository;
import com.project.MedicalDiary.Repository.RoomDetailRepository;
import com.project.MedicalDiary.Service.ImpInterface.RoomDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomDetailServiceImp implements RoomDetailService {

    private final RoomDetailRepository roomDetailRepository;
    private final InformationRepository informationRepository;

    @Autowired
    public RoomDetailServiceImp(RoomDetailRepository roomDetailRepository, InformationRepository informationRepository) {
        this.roomDetailRepository = roomDetailRepository;
        this.informationRepository = informationRepository;
    }

    @Override
    public Boolean save(RoomDetail roomDetail) {
        Optional<Information> info = informationRepository.findByCCCD(roomDetail.getIsFollowed().getCCCD());
        Optional<Information> infoRoom = informationRepository.findByCCCD(roomDetail.getRoom().getIDRoom());
        if (info.isPresent()) {
            if (info.get().getFamily() != infoRoom.get().getFamily()) {
                RoomDetail rD = roomDetailRepository.save(roomDetail);
                if (rD.equals(roomDetail)) {
                    return true;
                } else
                    return false;
            }
        }
        return false;
    }

    @Override
    public List<RoomDetail> getAllRoomDetails() {
        return roomDetailRepository.findAll();
    }

    @Override
    public List<RoomDetail> getRoomDetailsByIDisFollowed(String id) {
        return roomDetailRepository.findByisFollowed_CCCD(id);
    }

    @Override
    public Boolean deleteRoomDetail(RoomDetail roomDetail) {
        if (roomDetailRepository.existsByIDRoom(roomDetail.getRoom().getIDRoom())) {
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
        return roomDetailRepository.findByRoom_IDRoom(idRoom);
    }

    @Override
    public void updateStatus(String idRoom, String idIsFollowed, int Status) {
        int updatedCount = roomDetailRepository.updateStatus(idRoom, Status, idIsFollowed);
        if (updatedCount == 0) {
            throw new RuntimeException("No RoomDetail found with given parameters");
        }
    }
    @Override
    public List<RoomDetail> getPendingRequests(String idRoom, int Status) {
        return roomDetailRepository.findByRoom_IDRoomAndStatus(idRoom, Status);
    }
    @Override
    public List<RoomDetail> findByIsFollowed_CCCDAndStatus(String cccd,int Status){
        return roomDetailRepository.findByIsFollowed_CCCDAndStatus(cccd,Status);
    }

    @Override
    public Optional<RoomDetail> findRoomDetailById(RoomDetailId id) {
        return roomDetailRepository.findById(id);
    }

    @Override
    public Boolean deleteByID_IDRoomAndIsFollowed_CCCD(String idRoom, String idIsFollowed) {
        Boolean isDeleted = false;
        RoomDetailId id = new RoomDetailId(idRoom, idIsFollowed);
        Optional<RoomDetail> roomDetail = roomDetailRepository.findById(id);
        if (roomDetail.isPresent()) {
            roomDetailRepository.delete(roomDetail.get());
            isDeleted = true;
        }
        return isDeleted;
    }

    @Override
    public List<RoomDetail> findAllByRoom_IDRoomAndStatus(String idRoom, int Status) {
        return roomDetailRepository.findAllByRoom_IDRoomAndStatus(idRoom, Status);
    }

    @Override
    public Boolean existsByRoom_IDRoom(String idRoom) {
        return roomDetailRepository.existsByRoom_IDRoom(idRoom);
    }

    @Override
    public  Boolean deleteAllByRoom_IDRoom(String idRoom){
        List<RoomDetail> roomDetail = roomDetailRepository.findByID_IDRoom(idRoom);
        for (RoomDetail i : roomDetail) {
            roomDetailRepository.delete(i);
        }
        return roomDetailRepository.findByID_IDRoom(idRoom).isEmpty();
    }

    @Override
    public Boolean existsByID(RoomDetailId id) {
        return roomDetailRepository.existsByID(id);
    }
    @Override
    public Optional<RoomDetail> getRoomDetail(String IDRoom, String IDisFollowed) {
        return roomDetailRepository.findByID_IDRoomAndID_IDisFollowed(IDRoom, IDisFollowed);
    }
}

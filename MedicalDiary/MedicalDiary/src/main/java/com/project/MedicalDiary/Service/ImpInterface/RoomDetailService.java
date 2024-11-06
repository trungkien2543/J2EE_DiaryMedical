package com.project.MedicalDiary.Service.ImpInterface;

import com.project.MedicalDiary.Entity.RoomDetail;
import com.project.MedicalDiary.Entity.RoomDetailId;

import java.util.List;
import java.util.Optional;

public interface RoomDetailService {

    RoomDetail save(RoomDetail roomDetail);

    List<RoomDetail> getAllRoomDetails();

    List<RoomDetail> getRoomDetailsByIDisFollowed(String id);

    Boolean deleteRoomDetail(RoomDetail roomDetail);

    RoomDetail updateRoomDetail(RoomDetail roomDetail);

    List<RoomDetail> getAllRoomDetailsByRoomID(String idRoom);

    void updateStatus(String idRoom, String idIsFollowed, int Status);

    List<RoomDetail> getPendingRequests(String idRoom, int Status);

    List<RoomDetail> findByIsFollowed_CCCDAndStatus(String cccd, int Status);

    Optional<RoomDetail> findRoomDetailById(RoomDetailId id);
    Boolean deleteByID_IDRoomAndIsFollowed_CCCD(String idRoom, String idIsFollowed); //Delete when cancel
    List<RoomDetail> findAllByRoom_IDRoomAndStatus(String idRoom, int Status);
    Boolean existsByRoom_IDRoom(String idRoom);
    Boolean deleteAllByRoom_IDRoom(String idRoom);
    Boolean existsByID(RoomDetailId id);
}

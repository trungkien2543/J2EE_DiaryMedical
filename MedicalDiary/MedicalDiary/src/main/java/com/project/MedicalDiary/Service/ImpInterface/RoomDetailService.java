package com.project.MedicalDiary.Service.ImpInterface;

import com.project.MedicalDiary.Entity.RoomDetail;
import com.project.MedicalDiary.Entity.RoomDetailId;

import java.util.List;
import java.util.Optional;

public interface RoomDetailService {

    RoomDetail createRoomDetail(RoomDetail roomDetail);

    List<RoomDetail> getAllRoomDetails();

    List<RoomDetail> getRoomDetailsByIDisFollowed(String id);

    Boolean deleteRoomDetail(RoomDetail roomDetail);

    RoomDetail updateRoomDetail(RoomDetail roomDetail);

    List<RoomDetail> getAllRoomDetailsByRoomID(String idRoom);

    void updateStatus(String idRoom, String idIsFollowed, int Status);

    List<RoomDetail> getPendingRequests(String idRoom, int Status);

    List<RoomDetail> findByIsFollowed_CCCDAndStatus(String cccd, int Status);

    Optional<RoomDetail> findRoomDetailById(RoomDetailId id);
}

package com.project.MedicalDiary.Service.ImpInterface;

import com.project.MedicalDiary.Entity.RoomDetail;

import java.util.List;

public interface RoomDetailService {

    RoomDetail  createRoomDetail(RoomDetail roomDetail) ;

    List<RoomDetail> getAllRoomDetails();
    List<RoomDetail> getRoomDetailsByIDisFollowed(String id);
    Boolean deleteRoomDetail(RoomDetail roomDetail);
    RoomDetail  updateRoomDetail(RoomDetail roomDetail);
    List<RoomDetail> getAllRoomDetailsByRoomID(String idRoom);
}

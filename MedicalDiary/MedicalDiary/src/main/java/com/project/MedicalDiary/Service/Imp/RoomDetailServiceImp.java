package com.project.MedicalDiary.Service.Imp;

import com.project.MedicalDiary.Model.RoomDetail;

import java.util.List;

public interface RoomDetailServiceImp {

    public Boolean createRoomDetail(RoomDetail roomDetail) ;

    public List<RoomDetail> getAllRoomDetails();
    public Boolean deleteRoomDetail(RoomDetail roomDetail);
    public Boolean updateRoomDetail(RoomDetail roomDetail);
    public List<RoomDetail> getAllRoomDetailsByRoomID(String idRoom);

}

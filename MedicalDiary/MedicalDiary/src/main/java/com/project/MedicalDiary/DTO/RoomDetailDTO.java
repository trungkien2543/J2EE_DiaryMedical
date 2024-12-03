package com.project.MedicalDiary.DTO;

import com.project.MedicalDiary.Entity.RoomDetail;

public class RoomDetailDTO {
    private String IDRoom;
    private String IDisFollowed;
    private int status;
    public RoomDetailDTO(String IDRoom, String IDisFollowed, int status) {
        this.IDRoom = IDRoom;
        this.IDisFollowed = IDisFollowed;
        this.status = status;
    }
    public RoomDetailDTO(RoomDetail roomDetail) {
        this.IDRoom = roomDetail.getID().getIDRoom();
        this.IDisFollowed = roomDetail.getID().getIDisFollowed();
        this.status = roomDetail.getStatus();
    }

}

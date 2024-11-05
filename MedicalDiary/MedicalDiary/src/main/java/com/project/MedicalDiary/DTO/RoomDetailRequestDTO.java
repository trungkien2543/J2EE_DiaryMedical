package com.project.MedicalDiary.DTO;

import com.project.MedicalDiary.Entity.Information;
import com.project.MedicalDiary.Entity.Room;
import com.project.MedicalDiary.Entity.RoomDetailId;
import lombok.Data;
@Data
public class RoomDetailRequestDTO {
    private RoomDetailId ID;
    private Room room;
    private Information isFollowed;
    private int status;
    private Information HouseOwner;

}

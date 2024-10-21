package com.project.MedicalDiary.Service.Imp;

import com.project.MedicalDiary.Model.Room;

import java.util.List;

public interface RoomService {
    public Boolean createRoom(Room room) ;

    public List<Room> getAll();

    public Boolean deleteRoom(Room Room);

    public Boolean updateRoom(Room room);
    public List<Room> getRoomByIDFamily(Room room);
}

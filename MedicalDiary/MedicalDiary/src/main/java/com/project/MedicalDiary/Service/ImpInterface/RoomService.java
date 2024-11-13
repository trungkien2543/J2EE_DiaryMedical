package com.project.MedicalDiary.Service.ImpInterface;

import com.project.MedicalDiary.Entity.Information;
import com.project.MedicalDiary.Entity.Room;

import java.util.List;
import java.util.Map;

public interface RoomService {
    public Room createRoom(Room room) ;

    public List<Room> getAll();

    public Boolean deleteRoom(Room Room);

    public Room updateRoom(Room room);
    public List<Room> getRoomByIDRoom(String IDRoom);
    public Map<Information, Room> mapRoomsToMembers(Iterable<Information> listInfoOfFml, Iterable<Room> listRoom);
    public Boolean comparePin(String pin,String cccd);
}

package com.project.MedicalDiary.Entity;

import java.io.Serializable;
import java.util.Objects;

import lombok.*;


public class RoomDetailId implements Serializable {

    private String IDRoom; // This should match IDRoom in RoomDetail
    private String ID_isFollowed; // This should match ID_isFollowed in RoomDetail

    // Default constructor
    public RoomDetailId() {}

    public RoomDetailId(String IDRoom, String ID_isFollowed) { // Update constructor parameter name
        this.IDRoom = IDRoom; // Assign correctly
        this.ID_isFollowed = ID_isFollowed; // Assign correctly
    }

    // Getters and setters (optional, but good for consistency)
    public String getIDRoom() {
        return IDRoom;
    }

    public void setIDRoom(String IDRoom) {
        this.IDRoom = IDRoom;
    }

    public String getID_isFollowed() {
        return ID_isFollowed; // Use the correct variable name
    }

    public void setID_isFollowed(String ID_isFollowed) {
        this.ID_isFollowed = ID_isFollowed; // Use the correct variable name
    }

    // Override equals() and hashCode() for proper comparison
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RoomDetailId)) return false;
        RoomDetailId that = (RoomDetailId) o;
        return Objects.equals(IDRoom, that.IDRoom) && Objects.equals(ID_isFollowed, that.ID_isFollowed); // Update field name
    }

    @Override
    public int hashCode() {
        return Objects.hash(IDRoom, ID_isFollowed); // Update field name
    }
}


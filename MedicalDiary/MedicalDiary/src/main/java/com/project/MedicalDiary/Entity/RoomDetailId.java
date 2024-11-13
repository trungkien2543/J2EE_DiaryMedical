package com.project.MedicalDiary.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.io.Serializable;
import java.util.Objects;
@Data
@Embeddable
public class RoomDetailId implements Serializable {
//
//    private String IDRoom; // Match field name in RoomDetail
//    private String IDisFollowed; // Match field name in RoomDetail
    @Size(max = 255)
    @NotNull
    @Column(name = "ID_Room", nullable = false)
    private String IDRoom;

    @Size(max = 255)
    @NotNull
    @Column(name = "ID_IsFollowed", nullable = false)
    private String IDisFollowed;
    // Default constructor
    public RoomDetailId() {}

    public RoomDetailId(String IDRoom, String IDisFollowed) {
        this.IDRoom = IDRoom;
        this.IDisFollowed = IDisFollowed;
    }

    public String getIDRoom() {
        return IDRoom;
    }

    public void setIDRoom(String IDRoom) {
        this.IDRoom = IDRoom;
    }

    public String getIDisFollowed() {
        return IDisFollowed;
    }

    public void setIDisFollowed(String IDisFollowed) {
        this.IDisFollowed = IDisFollowed;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RoomDetailId)) return false;
        RoomDetailId that = (RoomDetailId) o;
        return Objects.equals(IDRoom, that.IDRoom) && Objects.equals(IDisFollowed, that.IDisFollowed);
    }

    @Override
    public int hashCode() {
        return Objects.hash(IDRoom, IDisFollowed);
    }
}

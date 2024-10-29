package com.project.MedicalDiary.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@IdClass(RoomDetailId.class)
@Table(name = "room_detail")
public class RoomDetail {
    @Id
    @Column(name = "ID_Room", nullable = false)
    private String IDRoom;
    @Id
    @Column(name = "ID_isFollowed", nullable = false)
    private String IDisFollowed;

    @Column(name = "Status")
    private int Status;

    @ManyToOne
    @JoinColumn(name = "ID_Room", referencedColumnName = "Id_Room", insertable = false, updatable = false) // Remove duplicate mapping
    @JsonIgnore
    private Room room;
    // Relationship to Information entity
    @ManyToOne
    @JoinColumn(name = "ID_isFollowed", referencedColumnName = "CCCD", insertable = false, updatable = false)
    @JsonIgnore
    private Information information; // Links ID_isFollowed to CCCD in Information
}

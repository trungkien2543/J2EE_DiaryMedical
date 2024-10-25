package com.project.MedicalDiary.Entity;

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
    private String ID_isFollowed;

    @Column(name = "Status")
    private int Status;

    @ManyToOne
    @JoinColumn(name = "Id_Room", nullable = false)
    private Room room;
    // Relationship to Information entity
    @ManyToOne
    @JoinColumn(name = "ID_isFollowed", referencedColumnName = "CCCD", insertable = false, updatable = false)
    private Information information; // Links ID_isFollowed to CCCD in Information
}

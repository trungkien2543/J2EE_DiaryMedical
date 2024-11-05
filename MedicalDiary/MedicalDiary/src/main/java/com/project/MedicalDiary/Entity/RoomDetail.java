package com.project.MedicalDiary.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
//@IdClass(RoomDetailId.class)
@Table(name = "room_detail")
public class RoomDetail {
    @EmbeddedId
    private RoomDetailId ID;

    @MapsId("IDRoom")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ID_Room", nullable = false)
    private Room room;

    @MapsId("IDisFollowed")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ID_IsFollowed", nullable = false)
    private Information isFollowed;

    @Column(name = "Status")
    private int status;
}

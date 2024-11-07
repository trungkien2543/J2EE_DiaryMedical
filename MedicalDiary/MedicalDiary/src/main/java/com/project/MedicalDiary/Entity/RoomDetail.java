package com.project.MedicalDiary.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
    @NotNull(message = "ID is required")
    private RoomDetailId ID;

    @MapsId("IDRoom")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ID_Room", nullable = false)
    @NotNull(message = "Room is required")
    private Room room;

    @MapsId("IDisFollowed")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ID_IsFollowed", nullable = false)
    @NotNull(message = "isFollowed is required")
    private Information isFollowed;

    @Column(name = "Status")
    private int status;
}

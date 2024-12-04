package com.project.MedicalDiary.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
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
    @JsonIgnore  // Bỏ qua khi chuyển đổi JSON
    private Room room;

    @MapsId("IDisFollowed")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ID_IsFollowed", nullable = false)
    @NotNull(message = "isFollowed is required")
    @JsonIgnore  // Bỏ qua khi chuyển đổi JSON
    private Information isFollowed;

    @Column(name = "Status")
    private int status;
}

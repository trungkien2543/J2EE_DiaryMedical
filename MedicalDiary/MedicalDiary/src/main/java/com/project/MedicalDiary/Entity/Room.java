package com.project.MedicalDiary.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "room")
public class Room {

    @Id
    @Column(name = "Id_Room", nullable = false, unique = true)
    @NotNull(message = "ROOM ID is the identification code of the room owner.")
    private String IDRoom;

    @Column(name = "PIN", nullable = false)
    @NotNull(message = "Please enter pin code as number")
    private String PIN;

}

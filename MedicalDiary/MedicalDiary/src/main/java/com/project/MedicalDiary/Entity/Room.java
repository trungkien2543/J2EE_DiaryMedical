package com.project.MedicalDiary.Entity;

import jakarta.persistence.*;
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
    private String IDRoom;

    @Column(name = "PIN", nullable = false)
    private String PIN;

}

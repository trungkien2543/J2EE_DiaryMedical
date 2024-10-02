package com.project.MedicalDiary.Model;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Data
@Table(name = "Family")
public class Family {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Family", nullable = false, unique = true)
    private Long idFamily;

    @Column(name = "Name", columnDefinition = "TEXT")
    private String name;
}

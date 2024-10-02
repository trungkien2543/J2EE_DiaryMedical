package com.project.MedicalDiary.Model;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "Drug")
public class Drug {

    @Id
    @Column(name = "ID_Drug", nullable = false, unique = true)
    private String idDrug;

    @Column(name = "Name_Drug")
    private String nameDrug;

    @Column(name = "Description")
    private String description;

    @Column(name = "Price")
    private Double price;
}
package com.project.MedicalDiary.Model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
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
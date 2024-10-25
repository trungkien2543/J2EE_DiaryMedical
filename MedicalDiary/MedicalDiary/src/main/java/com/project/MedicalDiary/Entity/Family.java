package com.project.MedicalDiary.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "family")
public class Family {

    @Id
    @Column(name = "ID_Family")
    private Long IDFamily;

    @Column(name = "Name", nullable = false)
    private String Name;


    // Liên kết ngược với Account
    @OneToMany(mappedBy = "family", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Account> accounts;

    // Liên kết ngược với Information
    @OneToMany(mappedBy = "family", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Information> informations; // Update this to refer to the Information entity
}

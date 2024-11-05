package com.project.MedicalDiary.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
//@ToString(exclude = {"accounts", "informations"})
@Entity
@Table(name = "family")
public class Family {

    @Id
    @Column(name = "ID_Family")
    @GeneratedValue(strategy = GenerationType.AUTO) // Hoặc GenerationType.AUTO
    @NotNull(message = "ID Family not null")
    private Long IDFamily;

    @Column(name = "Name", nullable = false)
    private String Name;


//    // Liên kết ngược với Account
//    @OneToOne(mappedBy = "family", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JsonBackReference
//    private Account accounts;

    public Family(String name) {
        Name = name;
    }

    // Liên kết ngược với Information
//    @OneToMany(mappedBy = "family", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JsonBackReference  // This will serialize the list of Information objects
//    private List<Information> informations; // Update this to refer to the Information entity

    @OneToMany(mappedBy = "family", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore  // Prevents serialization to avoid circular reference
    private List<Information> informations;
}

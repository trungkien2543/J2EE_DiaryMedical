package com.project.MedicalDiary.Model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "Information")
public class Information {

    @Id
    @Column(name = "CCCD", nullable = false, unique = true)
    private String cccd;

    @Column(name = "Name")
    private String name;

    @Column(name = "Gender")
    private Boolean gender;

    @Column(name = "BHYT")
    private String bhyt;

    @Column(name = "Phone")
    private String phone;

    @Column(name = "Job")
    private String job;

    @Column(name = "Department")
    private String department;

    @Column(name = "Address")
    private String address;

    @Column(name = "Medical_History", columnDefinition = "LONGTEXT")
    private String medicalHistory;

    @Column(name = "ID_Family", nullable = false)
    private Long idFamily;
}

package com.project.MedicalDiary.Entity;
import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "information")
public class Information {

    @Column(name = "CCCD")
    @Id
    private String CCCD;

    @Column(name = "Name", nullable = false)
    private String Name;

    @Column(name = "Gender")
    private Boolean Gender;

    @Column(name = "BHYT")
    private String BHYT;

    @Column(name = "Phone")
    private String Phone;

    @Column(name = "Job")
    private String Job;

    @Column(name = "Department")
    private String Department;

    @Column(name = "Address")
    private String Address;

    @Column(name = "Medical_History")
    private String MedicalHistory;

//    @Column(name = "ID_Family")
//    private Long ID_Family;

    @ManyToOne // Indicates the relationship type
    @JoinColumn(name = "ID_Family", referencedColumnName = "ID_Family") // Specify foreign key column
    private Family family;
}


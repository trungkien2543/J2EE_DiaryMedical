package com.project.MedicalDiary.Entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "family")
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

    @Column(name = "ID_Family")
    private Long IDFamily;

//    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "ID_Family", referencedColumnName = "ID_Family") // This links to ID_Family in Family
//    @JsonIgnore
//    private Family family;

}


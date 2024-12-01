package com.project.MedicalDiary.Entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "family")
@Entity
@Table(name = "information")
public class Information {

    public static final String EMAIL = "Email";
    @Id
    @Column(name = "CCCD")
    @NotNull(message = "Please enter your identification code")
    @Pattern(regexp = "^[0-9]{1,12}$", message = "CCCD must be a numeric value with up to 12 digits.")
    private String CCCD;

    @Column(name = "Name")
    @NotNull(message = "Please enter your name")
    private String Name;

    @Column(name = "Gender")
    @NotNull(message = "Please select your gender")
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

    @Column(name = EMAIL)
    private String Email;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ID_Family", referencedColumnName = "ID_Family") // This links to ID_Family in Family
//    @JsonManagedReference
    private Family family;

}


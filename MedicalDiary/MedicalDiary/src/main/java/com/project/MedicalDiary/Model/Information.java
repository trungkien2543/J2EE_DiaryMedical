package com.project.MedicalDiary.Model;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Information {

    private String cccd;


    private String name;

    private Boolean gender;

    private String bhyt;

    private String phone;

    private String job;

    private String department;

    private String address;

    private String medicalHistory;

    private Long ID_Family;
}

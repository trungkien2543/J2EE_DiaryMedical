package com.project.MedicalDiary.Model;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Family {

    private Long ID_Family;

    private String Name;
}

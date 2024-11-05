package com.project.MedicalDiary.DTO;

import com.project.MedicalDiary.Entity.Family;
import com.project.MedicalDiary.Entity.Information;
import lombok.Data;


@Data
public class InformationRequestDTO {
    private Information information;
    private Family family;
}


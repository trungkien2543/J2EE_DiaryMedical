package com.project.MedicalDiary.Service.ImpInterface;

import com.project.MedicalDiary.Entity.Information;

import java.util.List;
import java.util.Optional;

public interface InformationService {
    Information getByCCCD(String cccd);
    List<Information> getAll();
    List<Information> findByFamily_IDFamily(Long idFamily); // This method looks correct
    Optional<Information> findByCCCD(String cccd); // This method looks correct
    Information createInformation(Information information);
    Boolean updateInformation(Information information);
    Boolean deleteInformation(Information information);
}

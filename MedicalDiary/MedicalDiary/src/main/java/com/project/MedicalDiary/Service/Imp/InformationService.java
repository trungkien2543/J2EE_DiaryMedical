package com.project.MedicalDiary.Service.Imp;

import com.project.MedicalDiary.Model.Information;

import java.util.List;
import java.util.Optional;

public interface InformationService {
    public List<Information> getAll();
    public List<Information> findByIDFamily(long idFamily);
    public Optional<Information> findByCCCD(String cccd);
    public Boolean createInformation(Information information);
    public Boolean updateInformation(Information information);
    public Boolean deleteInformation(Information information);
}

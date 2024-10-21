package com.project.MedicalDiary.Service;

import com.project.MedicalDiary.Model.Information;
import com.project.MedicalDiary.Repository.InformationRepository;
import com.project.MedicalDiary.Service.Imp.InformationServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InformationService implements InformationServiceImp {

    private final InformationRepository informationRepository;

    @Autowired
    public InformationService(InformationRepository informationRepository) {
        this.informationRepository = informationRepository;
    }
    @Override
    public List<Information> getAll() {
        return informationRepository.getAll();
    }

    @Override
    public List<Information> findByIDFamily(long idFamily) {
        return informationRepository.findByIDFamily(idFamily);
    }

    @Override
    public Optional<Information> findByCCCD(String cccd) {
        return informationRepository.findByCCCD(cccd);
    }

    @Override
    public Boolean createInformation(Information information) {
        return informationRepository.createInformation(information);
    }

    @Override
    public Boolean updateInformation(Information information) {
        return informationRepository.updateInformation(information);
    }

    @Override
    public Boolean deleteInformation(Information information) {
        return informationRepository.deleteInformation(information);
    }
}

package com.project.MedicalDiary.Service;

import com.project.MedicalDiary.Entity.Information;
import com.project.MedicalDiary.Repository.InformationRepository;
import com.project.MedicalDiary.Service.Imp.InformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InformationServiceImp implements InformationService {

    private final InformationRepository informationRepository;

    @Autowired
    public InformationServiceImp(InformationRepository informationRepository) {
        this.informationRepository = informationRepository;
    }

    @Override
    public List<Information> getAll() {
        return informationRepository.findAll();
    }

    @Override
    public List<Information> findByFamily_IDFamily(Long idFamily) {
        return informationRepository.findByFamily_IDFamily(idFamily);
    }
    @Override
    public Optional<Information> findByCCCD(String cccd) {
        return informationRepository.findByCCCD(cccd);
    }

    @Override
    public Information createInformation(Information information) {
        return informationRepository.save(information);
    }

    @Override
    public Boolean deleteInformation(Information information) {
        if (informationRepository.existsById(information.getCCCD())) {
            informationRepository.delete(information);
            return true; // Deletion successful
        }
        return false; // Information does not exist
    }

    @Override
    public Boolean updateInformation(Information information) {
        if (informationRepository.existsById(information.getCCCD())) {
            informationRepository.save(information);
            return true; // Update successful
        }
        return false; // Information does not exist
    }
}

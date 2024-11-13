package com.project.MedicalDiary.Service.Imp;

import com.project.MedicalDiary.Entity.Family;
import com.project.MedicalDiary.Entity.Information;
import com.project.MedicalDiary.Repository.FamilyRepository;
import com.project.MedicalDiary.Repository.InformationRepository;
import com.project.MedicalDiary.Service.ImpInterface.FamilyService;
import com.project.MedicalDiary.Service.ImpInterface.InformationService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InformationServiceImp implements InformationService {

    private final InformationRepository informationRepository;
    private FamilyService familyService;

    @Autowired
    public InformationServiceImp(InformationRepository informationRepository) {
        this.informationRepository = informationRepository;
    }

    @Override
    public Information getByCCCD(String cccd) {return informationRepository.getReferenceById(cccd);}

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

//    @Override
//    public Information createInformation(Information information) {
//
//        if (informationRepository.existsById(information.getCCCD())) { //Nếu tồn tại CCCD với giá trị IDFamily NULL thì set lại IDFamily
//            informationRepository.updateIDFamilyToValue(information.getCCCD(),information.getFamily().getIDFamily());
//            return information;
//        }
//        return informationRepository.save(information);
//    }
@Override
@Transactional
public Information createInformation(Information information) {
    // Check if the Information entity has a family and its IDFamily is set
    Family family = information.getFamily();
    if (family != null && family.getIDFamily() == null) {
        // Save the family if it's not saved already
        family = familyService.createFamily(family);
        information.setFamily(family); // Link the family back to information
    }

    // Use findById to check existence instead of existsById
    Optional<Information> existingInformation = informationRepository.findById(information.getCCCD());
    if (existingInformation.isPresent()) {
        // Update the IDFamily in the existing record
        informationRepository.save(information);
        informationRepository.updateIDFamilyToValue(information.getCCCD(), family.getIDFamily());
        return existingInformation.get(); // Return the updated entity
    }

    // Save the new information record
    return informationRepository.save(information);
}

    @Override
    public Boolean deleteInformation(String cccd) {
        if (informationRepository.existsById(cccd)) {
            informationRepository.deleteById(cccd);
//            informationRepository.delete(cccd);
            return true; // Deletion successful
        }
        return false; // Information does not exist
    }

    @Override
    public Boolean updateIDFamilyToNull(String cccd) { //Delete Info
        if (informationRepository.existsById(cccd)) {
            informationRepository.updateIDFamilyToNull(cccd);
            return true; // Update successful
        }
        return false; // Information does not exist
    }

    @Override
    public Boolean existsByCCCDAndFamily_IDFamilyNotNull(String CCCD) {
        return informationRepository.existsByCCCDAndFamily_IDFamilyNotNull(CCCD);
    }

    @Override
    public Boolean existsByCCCDAndFamily_IDFamilyNull(String CCCD) {
        return informationRepository.existsByCCCDAndFamily_IDFamilyNull(CCCD);
    }
    @Override
    public Boolean existsByCCCD(String CCCD) {
        return informationRepository.existsByCCCD(CCCD);
    }

    @Override
    public Optional<Information> findByCCCDAndFamily_IDFamilyNot(String CCCD, Long idFamily) {
        return informationRepository.findByCCCDAndFamily_IDFamilyNot(CCCD, idFamily);
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

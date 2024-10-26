package com.project.MedicalDiary.Service.Imp;

import com.project.MedicalDiary.Entity.Family;
import com.project.MedicalDiary.Repository.FamilyRepository;
import com.project.MedicalDiary.Service.ImpInterface.FamilyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FamilyServiceImp implements FamilyService {

    private final FamilyRepository familyRepository;

    @Autowired
    public FamilyServiceImp(FamilyRepository familyRepository) {
        this.familyRepository = familyRepository;
    }

    @Override
    public Optional<Family> findByID(long id) {
        return familyRepository.findById(id);
    }

    @Override
    public Family createFamily(Family family) {
        return familyRepository.save(family);
    }

    @Override
    public List<Family> getAll() {
        return familyRepository.findAll();
    }

    @Override
    public boolean updateFamily(Family family) {
        // You may want to check if the family exists before saving
        if (familyRepository.existsById(family.getIDFamily())) {
            familyRepository.save(family);
            return true;
        }
        return false; // Family does not exist, so update is not possible
    }

    @Override
    public boolean deleteFamily(Family family) {
        if (familyRepository.existsById(family.getIDFamily())) {
            familyRepository.delete(family);
            return true; // Deletion successful
        }
        return false; // Family does not exist, so deletion is not possible
    }

}

package com.project.MedicalDiary.Service;

import com.project.MedicalDiary.Model.Family;
import com.project.MedicalDiary.Repository.FamilyReponsitory;
import com.project.MedicalDiary.Service.Imp.FamilyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FamilyServiceImp implements FamilyService {
    private final FamilyReponsitory familyReponsitory;

    @Autowired
    public FamilyServiceImp(FamilyReponsitory familyReponsitory) {
        this.familyReponsitory = familyReponsitory;
    }

    @Override
    public Optional<Family> findByID(long id) {
        return familyReponsitory.findByID(id);
    }

    @Override
    public Family createFamily(Family family) {
        return familyReponsitory.createFamily(family);
    }

    @Override
    public List<Family> getAll() {
        return familyReponsitory.getAll();
    }

    @Override
    public boolean updateFamily(Family family) {
        return familyReponsitory.updateFamily(family);
    }

    @Override
    public boolean deleteFamily(Family family) {
        return familyReponsitory.deleteFamily(family);
    }

}

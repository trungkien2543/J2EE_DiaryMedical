package com.project.MedicalDiary.Service.ImpInterface;

import com.project.MedicalDiary.Entity.Family;

import java.util.List;
import java.util.Optional;

public interface FamilyService {
    public Optional<Family> findByID(long id);
    public Family createFamily(Family family);
    public List<Family> getAll();
    public boolean updateFamily(Family family);
    public boolean deleteFamily(Family family);
}

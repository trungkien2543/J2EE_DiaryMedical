package com.project.MedicalDiary.Repository;

import com.project.MedicalDiary.Entity.Family;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FamilyRepository extends JpaRepository<Family, Long> {

    // Method to find a family by ID
    Optional<Family> findById(Long id);

    // The default CRUD methods (save, delete, findAll, etc.) are already provided by JpaRepository
}
package com.project.MedicalDiary.Repository;

import com.project.MedicalDiary.Entity.Information;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InformationRepository extends JpaRepository<Information, String> {
    List<Information> findByIDFamily(Long idFamily);
    Optional<Information> findByCCCD(String cccd);
}

package com.project.MedicalDiary.Repository;

import com.project.MedicalDiary.Entity.Information;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InformationRepository extends JpaRepository<Information, String> {
    List<Information> findByFamily_IDFamily(Long idFamily);
    Optional<Information> findByCCCD(String cccd);
    // Custom query to set IDFamily to null
    @Modifying
    @Transactional
    @Query("UPDATE Information i SET i.family.IDFamily = null WHERE i.CCCD = :cccd")
    void updateIDFamilyToNull(String cccd);
    @Modifying
    @Transactional
    @Query("UPDATE Information i SET i.family.IDFamily = :idFamily WHERE i.CCCD = :cccd")
    void updateIDFamilyToValue(String cccd, Long idFamily);
    //Repository check Information exist by CCCD and IDFamily != null
    Boolean existsByCCCDAndFamily_IDFamilyNotNull(String cccd);
    //Repository check Information exist by CCCD and IDFamily == null
    Boolean existsByCCCDAndFamily_IDFamilyNull(String cccd);

    Boolean existsByCCCD(String cccd);
    @Query("SELECT i FROM Information i WHERE i.CCCD = :cccd AND i.family.IDFamily <> :idFamily")
    Optional<Information> findByCCCDAndFamily_IDFamilyNot(String cccd, Long idFamily);


}

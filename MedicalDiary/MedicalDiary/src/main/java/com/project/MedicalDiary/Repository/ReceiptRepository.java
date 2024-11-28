package com.project.MedicalDiary.Repository;


import com.project.MedicalDiary.Entity.Receipt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReceiptRepository extends JpaRepository<Receipt, String> {
    List<Receipt> findByPatient_CCCD(String idPatient);

//    @Query("SELECT r FROM Receipt r WHERE r.dateVisit BETWEEN CURRENT_DATE AND CURRENT_DATE + 3")
//    List<Receipt> findReceiptsWithinNextThreeDays();

    @Query(value = "SELECT * FROM receipt WHERE Date_Visit BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 3 DAY)", nativeQuery = true)
    List<Receipt> findReceiptsWithinNextThreeDays();


    @Query("SELECT r FROM Receipt r WHERE r.dateVisit BETWEEN :startDate AND :endDate")
    List<Receipt> findReceiptsWithinDateRange(@Param("startDate") LocalDateTime startDate,
                                              @Param("endDate") LocalDateTime endDate);



}

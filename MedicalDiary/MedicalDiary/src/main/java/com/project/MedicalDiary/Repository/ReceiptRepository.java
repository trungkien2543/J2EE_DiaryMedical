package com.project.MedicalDiary.Repository;


import com.project.MedicalDiary.Entity.Receipt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;
import java.util.List;

@Repository
public interface ReceiptRepository extends JpaRepository<Receipt, String> {
    List<Receipt> findByPatient_CCCD(String idPatient);
}

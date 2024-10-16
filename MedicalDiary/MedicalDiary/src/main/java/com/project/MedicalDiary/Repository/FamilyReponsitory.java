package com.project.MedicalDiary.Repository;

import com.project.MedicalDiary.Mapper.AccountMapper;
import com.project.MedicalDiary.Mapper.FamilyMapper;
import com.project.MedicalDiary.Mapper.InformationMapper;
import com.project.MedicalDiary.Model.Account;
import com.project.MedicalDiary.Model.Family;
import com.project.MedicalDiary.Model.Information;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public class FamilyReponsitory extends JdbcDaoSupport {
    @Autowired
    public FamilyReponsitory(DataSource dataSource) {
        this.setDataSource(dataSource);
    }

    public Optional<Family> findByID(long id) {
        // Câu truy vấn SQL để lấy thông tin dựa trên CCCD
        String sql = FamilyMapper.BASE_SQL + " WHERE f.ID_Family = ?";

        Object[] params = new Object[]{id};
        FamilyMapper familyMapper = new FamilyMapper();

        // Thực hiện truy vấn và lấy một bản ghi (nếu có)
        List<Family> listFamilys = this.getJdbcTemplate().query(sql, params, familyMapper);

        // Trả về Optional, nếu không có bản ghi thì sẽ là Optional.empty()
        return listFamilys.stream().findFirst();
    }
}

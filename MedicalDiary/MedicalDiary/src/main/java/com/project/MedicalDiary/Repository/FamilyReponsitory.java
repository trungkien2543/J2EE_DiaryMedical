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

    public Family createFamily(@org.jetbrains.annotations.NotNull Family family) {
        String sql = "INSERT INTO Family (ID_Family, Name) VALUES (?, ?);";

        Object[] params = new Object[]{
                family.getID_Family(),
                family.getName(),
        };

        this.getJdbcTemplate().update(sql, params);

        // Return the created family object
        return family;
    }

    public List<Family> getAll() {
        String sql = FamilyMapper.BASE_SQL;

        List<Family> listFamilies = this.getJdbcTemplate().query(sql, new FamilyMapper());

        return listFamilies;
    }

    public boolean deleteFamily(Family family) {
        String sql = "DELETE FROM Family WHERE ID_Family = ?";

        Object[] params = new Object[]{family.getID_Family()};

        int rowsAffected = this.getJdbcTemplate().update(sql, params);

        return rowsAffected > 0;
    }

    public boolean updateFamily(Family family) {
        String sql = "UPDATE Family SET Name = ? WHERE ID_Family = ?";

        Object[] params = new Object[]{
                family.getName(),
                family.getID_Family(),
        };

        int rowsAffected = this.getJdbcTemplate().update(sql, params);

        return rowsAffected > 0;
    }
}

package com.project.MedicalDiary.Repository;

import com.project.MedicalDiary.Mapper.InformationMapper;
import com.project.MedicalDiary.Mapper.ReceiptMapper;
import com.project.MedicalDiary.Model.Information;
import com.project.MedicalDiary.Model.Receipt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public class InformationRepository extends JdbcDaoSupport {
    @Autowired
    public InformationRepository(DataSource dataSource) {
        this.setDataSource(dataSource);
    }

    public List<Information> getAll() {
        String sql = InformationMapper.BASE_SQL;

        Object[] params = new Object[]{};
        InformationMapper informationMapper = new InformationMapper();
        List<Information> listInformations = this.getJdbcTemplate().query(sql, params, informationMapper);

        return listInformations;
    }
    public Optional<Information> findByCCCD(String cccd) {
        // Câu truy vấn SQL để lấy thông tin dựa trên CCCD
        String sql = InformationMapper.BASE_SQL + " WHERE i.CCCD = ?";

        Object[] params = new Object[]{cccd};
        InformationMapper informationMapper = new InformationMapper();

        // Thực hiện truy vấn và lấy một bản ghi (nếu có)
        List<Information> listInformations = this.getJdbcTemplate().query(sql, params, informationMapper);

        // Trả về Optional, nếu không có bản ghi thì sẽ là Optional.empty()
        return listInformations.stream().findFirst();
    }


}

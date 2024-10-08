package com.project.MedicalDiary.Repository;


import com.project.MedicalDiary.Mapper.ReceiptMapper;
import com.project.MedicalDiary.Model.Receipt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;
import java.util.List;

@Repository
@Transactional
public class ReceiptRepository extends JdbcDaoSupport {

    @Autowired
    public ReceiptRepository(DataSource dataSource) {
        this.setDataSource(dataSource);
    }

    public List<Receipt> getListReceipt() {
        String sql = ReceiptMapper.BASE_SQL;

        Object[] params = new Object[]{};
        ReceiptMapper receiptMapper = new ReceiptMapper();
        List<Receipt> list = this.getJdbcTemplate().query(sql, params, receiptMapper);

        return list;
    }

    public List<Receipt> getListReceiptByIdPatient(String idPatient) {
        String sql = ReceiptMapper.BASE_SQL + " where ID_Patient = ?";  // Sử dụng ? làm placeholder

        Object[] params = new Object[]{ idPatient };  // Truyền tham số userName vào mảng params
        ReceiptMapper receiptMapper = new ReceiptMapper();
        try{
            List<Receipt> list = this.getJdbcTemplate().query(sql, params, receiptMapper);
            return list;
        }catch (EmptyResultDataAccessException e){
            return null;
        }
    }


    public Receipt getReceiptById(String groupId) {
        String sql = ReceiptMapper.BASE_SQL + " where ID_Receipt = ?";  // Sử dụng ? làm placeholder

        Object[] params = new Object[]{ groupId };  // Truyền tham số groupId vào mảng params
        ReceiptMapper receiptMapper = new ReceiptMapper();

        try {
            // Sử dụng queryForObject để lấy một đối tượng Receipt duy nhất
            Receipt receipt = this.getJdbcTemplate().queryForObject(sql, params, receiptMapper);
            return receipt;
        } catch (EmptyResultDataAccessException e) {
            return null;  // Trả về null nếu không tìm thấy kết quả
        }
    }

}

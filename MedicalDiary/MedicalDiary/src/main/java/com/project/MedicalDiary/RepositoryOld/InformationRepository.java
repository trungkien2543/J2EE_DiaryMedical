//package com.project.MedicalDiary.RepositoryOld;
//
//import com.project.MedicalDiary.Mapper.InformationMapper;
//import com.project.MedicalDiary.Mapper.ReceiptMapper;
//import com.project.MedicalDiary.Model.Information;
//import com.project.MedicalDiary.Model.Receipt;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.jdbc.core.support.JdbcDaoSupport;
//import org.springframework.stereotype.Repository;
//import org.springframework.transaction.annotation.Transactional;
//
//import javax.sql.DataSource;
//import java.util.List;
//import java.util.Optional;
//
//@Repository
//@Transactional
//public class InformationRepository extends JdbcDaoSupport {
//    @Autowired
//    public InformationRepository(DataSource dataSource) {
//        this.setDataSource(dataSource);
//    }
//
//    public List<Information> getAll() {
//        String sql = InformationMapper.BASE_SQL;
//
//        Object[] params = new Object[]{};
//        InformationMapper informationMapper = new InformationMapper();
//        List<Information> listInformations = this.getJdbcTemplate().query(sql, params, informationMapper);
//
//        return listInformations;
//    }
//    public List<Information> findByIDFamily(long idFamily) {
//        // SQL query to retrieve information based on ID_Family
//        String sql = InformationMapper.BASE_SQL + " WHERE i.ID_Family = ?";
//
//        Object[] params = new Object[]{idFamily};
//        InformationMapper informationMapper = new InformationMapper();
//
//        // Execute query and return the list of Information
//        List<Information> listInformations = this.getJdbcTemplate().query(sql, params, informationMapper);
//
//        return listInformations;
//    }
//
//    public Optional<Information> findByCCCD(String cccd) {
//        // Câu truy vấn SQL để lấy thông tin dựa trên CCCD
//        String sql = InformationMapper.BASE_SQL + " WHERE i.CCCD = ?";
//
//        Object[] params = new Object[]{cccd};
//        InformationMapper informationMapper = new InformationMapper();
//
//        // Thực hiện truy vấn và lấy một bản ghi (nếu có)
//        List<Information> listInformations = this.getJdbcTemplate().query(sql, params, informationMapper);
//
//        // Trả về Optional, nếu không có bản ghi thì sẽ là Optional.empty()
//        return listInformations.stream().findFirst();
//    }
//
//    public Information createInformation(Information information) {
//        String sql = "INSERT INTO Information (cccd, name, gender, bhyt, phone, job, department, address, Medical_History, ID_Family) " +
//                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
//
//        Object[] params = new Object[] {
//                information.getCccd(),
//                information.getName(),
//                information.getGender(),
//                information.getBhyt(),
//                information.getPhone(),
//                information.getJob(),
//                information.getDepartment(),
//                information.getAddress(),
//                information.getMedicalHistory(),
//                information.getID_Family()
//        };
//
//        int rowsAffected = this.getJdbcTemplate().update(sql, params);
//
//        // Return the created information object
//        if (rowsAffected > 0) {
//            return information; // Return the created information object
//        } else {
//            return null; // Or throw an exception if you prefer
//        }
//    }
//    public boolean deleteInformation(Information information) {
//        String sql = "DELETE FROM Information WHERE cccd = ?";
//
//        Object[] params = new Object[] { information.getCccd() };
//
//        int rowsAffected = this.getJdbcTemplate().update(sql, params);
//
//        return rowsAffected > 0;
//    }
//    public Boolean updateInformation(Information information) {
//        String sql = "UPDATE Information SET name = ?, gender = ?, bhyt = ?, phone = ?, job = ?, department = ?, address = ?, Medical_History = ?, ID_Family = ? " +
//                "WHERE cccd = ?";
//
//        Object[] params = new Object[] {
//                information.getName(),
//                information.getGender(),
//                information.getBhyt(),
//                information.getPhone(),
//                information.getJob(),
//                information.getDepartment(),
//                information.getAddress(),
//                information.getMedicalHistory(),
//                information.getID_Family(),
//                information.getCccd()
//        };
//
//        int rowsAffected = this.getJdbcTemplate().update(sql, params);
//
//        return rowsAffected > 0;
//    }
//
//
//
//
//
//}

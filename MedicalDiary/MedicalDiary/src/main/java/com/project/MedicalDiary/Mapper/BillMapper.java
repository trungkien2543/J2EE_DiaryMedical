package com.project.MedicalDiary.Mapper;

import com.project.MedicalDiary.Model.Bill;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class BillMapper implements RowMapper<Bill> {
    @Override
    public Bill mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Bill(
                rs.getLong("ID_Bill"),    // ID_Bill
                rs.getLong("Total")       // Total
        );
    }

}

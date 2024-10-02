package com.project.MedicalDiary.Mapper;

import com.project.MedicalDiary.Model.*;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class DetaiBillMapper implements RowMapper<DetailBill> {
    @Override
    public DetailBill mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new DetailBill(
                rs.getLong("ID_Bill"),       // ID_Bill
                rs.getString("ID_Drug"),     // ID_Drug
                rs.getInt("Amount_Drug"),    // Amount_Drug
                new Bill(                    // Bill object with ID_Bill and Total
                        rs.getLong("ID_Bill"),   // ID_Bill inside Bill object
                        rs.getLong("Total")      // Total inside Bill object
                ),
                new Drug(                    // Drug object with full details
                        rs.getString("ID_Drug"), // ID_Drug inside Drug object
                        rs.getString("Name_Drug"), // Name_Drug inside Drug object
                        rs.getString("Description"), // Description inside Drug object
                        rs.getDouble("Price")    // Price inside Drug object
                )
        );
    }


}

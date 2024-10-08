package com.project.MedicalDiary.Mapper;

import com.project.MedicalDiary.Model.Receipt;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ReceiptMapper implements RowMapper<Receipt> {

    public static final String BASE_SQL = "select * from receipt";
    @Override
    public Receipt mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Receipt(
                rs.getLong("ID_Receipt"),            // ID_Receipt
                rs.getString("ID_Patient"),          // ID_Patient
                rs.getString("ID_Doctor"),           // ID_Doctor
                rs.getString("Place"),                // Place
                rs.getObject("Date", java.time.LocalDateTime.class), // Date
                rs.getString("Reason"),               // Reason
                rs.getString("Diagnosis"),            // Diagnosis
                rs.getString("Treat"),                // Treat
                rs.getString("Url_Result"),           // Url_Result
                rs.getLong("ID_Bill"),                // ID_Bill
                rs.getString("Remind"),               // Remind
                rs.getObject("Date_Visit", java.time.LocalDateTime.class), // Date_Visit
                rs.getInt("Blood_Pressure"),          // Blood_Pressure
                rs.getInt("Weight"),                   // Weight
                rs.getInt("Height"),                   // Height
                rs.getInt("Heart_Rate"),              // Heart_Rate
                rs.getInt("Temperature")               // Temperature
        );
    }
}

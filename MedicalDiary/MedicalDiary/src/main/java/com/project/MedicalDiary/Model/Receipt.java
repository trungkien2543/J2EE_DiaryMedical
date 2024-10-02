package com.project.MedicalDiary.Model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "Receipt")
public class Receipt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Receipt", nullable = false, unique = true)
    private Long idReceipt;

    @Column(name = "ID_Patient")
    private String idPatient;

    @Column(name = "ID_Doctor")
    private String idDoctor;

    @Column(name = "Place")
    private String place;

    @Column(name = "Date")
    private java.time.LocalDateTime date;

    @Column(name = "Reason", columnDefinition = "LONGTEXT")
    private String reason;

    @Column(name = "Diagnosis")
    private String diagnosis;

    @Column(name = "Treat")
    private String treat;

    @Column(name = "Url_Result")
    private String urlResult;

    @Column(name = "ID_Bill")
    private Long idBill;

    @Column(name = "Remind", columnDefinition = "LONGTEXT")
    private String remind;

    @Column(name = "Date_Visit")
    private java.time.LocalDateTime dateVisit;

    @Column(name = "Blood_Pressure")
    private Integer bloodPressure;

    @Column(name = "Weight")
    private Integer weight;

    @Column(name = "Height")
    private Integer height;

    @Column(name = "Heart_Rate")
    private Integer heartRate;

    @Column(name = "Temperature")
    private Integer temperature;
}

package com.project.MedicalDiary.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "receipt")
public class Receipt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Receipt")
    private Long IDReceipt;

    @ManyToOne
    @JoinColumn(name = "ID_Patient", referencedColumnName = "CCCD", nullable = false)
    private Information patient;

    @ManyToOne
    @JoinColumn(name = "ID_Doctor", referencedColumnName = "CCCD", nullable = false)
    private Information doctor;

    @Column(name = "Place")
    private String place;

    @Column(name = "Date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy") // Định dạng ngày
    private LocalDateTime date;

    @Column(name = "Reason")
    private String reason;

    @Column(name = "Diagnosis")
    private String diagnosis;

    @Column(name = "Treat")
    private String treat;

    @Column(name = "Url_result")
    private String urlResult;

    @Column(name = "Url_BillDrug")
    private String urlBill;

    @Column(name = "Remind")
    private String remind;

    @Column(name = "Date_Visit")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy") // Định dạng ngày tái khám
    private LocalDateTime dateVisit;

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

    public Receipt(Information idPat, Information idDoc, String place, LocalDateTime date) {
        this.patient = idPat;
        this.doctor = idDoc;
        this.place = place;
        this.date = date;
    }
}
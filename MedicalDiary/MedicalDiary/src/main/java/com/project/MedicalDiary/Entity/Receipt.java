package com.project.MedicalDiary.Entity;

import jakarta.persistence.*;
import lombok.*;

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

//    @Column(name = "ID_Patient", nullable = false)
//    private String idPatient; // Keep as String
//
//    @Column(name = "ID_Doctor", nullable = false)
//    private String idDoctor; // Keep as String

    @ManyToOne
    @JoinColumn(name = "ID_Patient", referencedColumnName = "CCCD", nullable = false)
    private Information patient;

    @ManyToOne // Relationship with Information for doctor
    @JoinColumn(name = "ID_Doctor", referencedColumnName = "CCCD", nullable = false)
    private Information doctor; // Reference to Information for the doctor

    @Column(name = "Place")
    private String place;

    @Column(name = "Date")
    private java.time.LocalDateTime date;

    @Column(name = "Reason")
    private String reason;

    @Column(name = "Diagnosis")
    private String diagnosis;

    @Column(name = "Treat")
    private String treat;

    @Column(name = "Url_result")
    private String urlResult;

    @Column(name = "Url_BillDrug")
    private Long idBill;

    @Column(name = "Remind")
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

    public Receipt(Information idPat, Information idDoc, String place, java.time.LocalDateTime date) {
        this.patient = idPat;
        this.doctor = idDoc;
        this.place = place;
        this.date = date;
    }
}


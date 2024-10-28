package com.project.MedicalDiary.Model;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Receipt {

    private Long idReceipt;

    private String idPatient;


    private String idDoctor;


    private String place;


    private java.time.LocalDateTime date;

    private String reason;


    private String diagnosis;

    private String treat;

    private String urlResult;

    private String remind;

    private java.time.LocalDateTime dateVisit;

    private Integer bloodPressure;

    private Integer weight;

    private Integer height;

    private Integer heartRate;

    private Integer temperature;

    public Receipt(String idPat , String idDoc, String place, java.time.LocalDateTime date){
        this.idPatient= idPat;
        this.idDoctor= idDoc;
        this.place= place;
        this.date= date;
    }
}

package com.project.MedicalDiary.Model;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Data
@Table(name = "Bill")
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Bill", nullable = false, unique = true)
    private Long idBill;

    @Column(name = "Total")
    private Long total;
}

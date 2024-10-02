package com.project.MedicalDiary.Model;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Data
@Table(name = "Detail_Bill")
public class DetailBill {

    @Id
    @Column(name = "ID_Bill", nullable = false)
    private Long idBill;

    @Id
    @Column(name = "ID_Drug", nullable = false)
    private String idDrug;

    @Column(name = "Amount_Drug")
    private Integer amountDrug;

    @ManyToOne
    @JoinColumn(name = "ID_Bill", insertable = false, updatable = false)
    private Bill bill;

    @ManyToOne
    @JoinColumn(name = "ID_Drug", insertable = false, updatable = false)
    private Drug drug;
}

package com.project.MedicalDiary.Model;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Data
@Table(name = "Follow")
public class Follow {

    @Id
    @Column(name = "ID_Follow", nullable = false, unique = true)
    private String idFollow;

    @Column(name = "ID_IsFollowed", nullable = false)
    private String idIsFollowed;

    @Column(name = "Is_delete")
    private Boolean isDelete;
}
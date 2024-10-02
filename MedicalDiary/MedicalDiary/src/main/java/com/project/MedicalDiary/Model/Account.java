package com.project.MedicalDiary.Model;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "Account")
public class Account {

    @Id
    @Column(name = "UserName", nullable = false, unique = true)
    private String userName;

    @Column(name = "PassWord")
    private String passWord;

    @Column(name = "Email")
    private String email;

    @Column(name = "Permission")
    private int permission;
}

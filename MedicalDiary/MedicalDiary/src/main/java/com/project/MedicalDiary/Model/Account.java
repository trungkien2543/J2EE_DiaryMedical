package com.project.MedicalDiary.Model;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Account {

    private String Username;
    private String Password;
    private String Email;
    private int Permission;


}

package com.project.MedicalDiary.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "family")
@EqualsAndHashCode(exclude = "family")
@Entity
@Table(name = "account")
public class Account implements UserDetails {

    @Id
    @Column(name = "Email", unique = true, nullable = false)
    private String email;

    @Column(name = "ID_Family")
    private Long IDFamily;

    @Column(name = "PassWord")
    private String password; // Ensure this is named correctly


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }
    // Liên kết với Family bằng khóa ngoại ID_Family
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ID_Family", insertable = false, updatable = false)
    @JsonManagedReference
    private Family family;
}

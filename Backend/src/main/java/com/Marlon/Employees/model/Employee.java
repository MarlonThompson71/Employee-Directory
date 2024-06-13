package com.Marlon.Employees.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NonNull;
import jakarta.validation.constraints.NotBlank;


@Data
@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String firstName;

    private String lastName;

    private String jobTitle;

    @Lob
    private byte[] photoData; // New field to store photo data

    // Getters and setters
}

package com.pbcool.football101.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class League {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "league_name")
    private String leagueName;
}

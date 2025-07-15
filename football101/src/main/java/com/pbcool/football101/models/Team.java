package com.pbcool.football101.models;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "team_name")
    private String teamName;

    private String league;

//    @Column(name = "matches_played")
//    private Integer matchesPlayed;
//
//    private Integer won;
//    private Integer lost;
//    private Integer drawn;
//    private Integer points;
//    private String league;



}

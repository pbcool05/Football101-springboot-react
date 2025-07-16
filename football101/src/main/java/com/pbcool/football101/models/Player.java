package com.pbcool.football101.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "players")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;

    private Integer age;

    private String positions;

    @Column(name = "matches_played")
    private Integer matchesPlayed;

    private Integer goals;

    private Integer assists;

}

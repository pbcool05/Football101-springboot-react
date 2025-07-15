package com.pbcool.football101.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Leaderboard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "team_id", unique = true)
    private Team team;

    @ManyToOne
    @JoinColumn(name = "league_id")
    private League league;

    @Column(name = "matches_played")
    private int matchesPlayed;

    private int won;
    private int lost;
    private int drawn;
    private int points;
}

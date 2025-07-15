package com.pbcool.football101.requests;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MatchDataRequest {

    private String leagueName;
    private String homeTeamName;
    private String awayTeamName;
    private String score;
    private String winner;
    private LocalDate matchDate;
}

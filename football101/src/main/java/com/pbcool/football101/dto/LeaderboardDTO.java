package com.pbcool.football101.dto;

import com.pbcool.football101.models.Leaderboard;
import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class LeaderboardDTO {

    private String teamName;
    private int matchesPlayed;
    private int won;
    private int lost;
    private int drawn;
    private int points;

    public LeaderboardDTO(Leaderboard lb) {
        this.teamName = lb.getTeam().getTeamName();
        this.matchesPlayed = lb.getMatchesPlayed();
        this.won = lb.getWon();
        this.lost = lb.getLost();
        this.drawn = lb.getDrawn();
        this.points = lb.getPoints();
    }

}

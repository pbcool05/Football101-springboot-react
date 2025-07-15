package com.pbcool.football101.service;

import com.pbcool.football101.dao.LeaderboardDao;
import com.pbcool.football101.dao.LeagueDao;
import com.pbcool.football101.dao.MatchDao;
import com.pbcool.football101.dao.TeamDao;
import com.pbcool.football101.models.Leaderboard;
import com.pbcool.football101.models.League;
import com.pbcool.football101.models.MatchRecord;
import com.pbcool.football101.models.Team;
import com.pbcool.football101.requests.MatchDataRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MatchService {

    @Autowired
    LeaderboardDao leaderboardDao;

    @Autowired
    TeamDao teamDao;

    @Autowired
    LeagueDao leagueDao;

    @Autowired
    MatchDao matchDao; //MatchDao actually refers to match history

    public ResponseEntity<String> updateMatchHistoryAndLeaderBoard(MatchDataRequest match) {

        //1.Fetch league and teams

        Optional<League> league = leagueDao.findByLeagueName(match.getLeagueName());
        Optional<Team> homeTeam = teamDao.findByTeamName(match.getHomeTeamName());
        Optional<Team> awayTeam = teamDao.findByTeamName(match.getAwayTeamName());

        if(league.isEmpty() || homeTeam.isEmpty() || awayTeam.isEmpty()){
            return new ResponseEntity<>("League or Teams not found", HttpStatus.NOT_FOUND);
        }

        //2. save match

        MatchRecord matchRecordEntity = new MatchRecord();
        matchRecordEntity.setLeague(league.get());
        matchRecordEntity.setHomeTeam(homeTeam.get());
        matchRecordEntity.setAwayTeam(awayTeam.get());
        matchRecordEntity.setScore(match.getScore());
        matchRecordEntity.setWinner(match.getWinner());
        matchRecordEntity.setMatchDate(match.getMatchDate());

        matchDao.save(matchRecordEntity);

        //3. Update leaderboard

        Team home = homeTeam.get();
        Team away = awayTeam.get();

        Leaderboard homeBoard = leaderboardDao.findByTeam(home).orElse(null);
        Leaderboard awayBoard = leaderboardDao.findByTeam(away).orElse(null);

//
//        Optional<Leaderboard> optionalHome = leaderboardDao.findById(home.getId());
//        Leaderboard homeBoard = optionalHome.orElse(null);
//
//        Optional<Leaderboard> optionalAway = leaderboardDao.findById(away.getId());
//        Leaderboard awayBoard = optionalAway.orElse(null);

        if (homeBoard == null || awayBoard == null) {
            return new ResponseEntity<>("Teams not found in leaderboard", HttpStatus.CONFLICT);
        }

        //update match played

        homeBoard.setMatchesPlayed(homeBoard.getMatchesPlayed() + 1);
        awayBoard.setMatchesPlayed(awayBoard.getMatchesPlayed() + 1);

        if (match.getWinner().equals(home.getTeamName())) {
            // Home team won
            homeBoard.setWon(homeBoard.getWon() + 1);
            homeBoard.setPoints(homeBoard.getPoints() + 3);

            awayBoard.setLost(awayBoard.getLost() + 1);

        }
        else if (match.getWinner().equals(away.getTeamName())) {
            // Away team won
            awayBoard.setWon(awayBoard.getWon() + 1);
            awayBoard.setPoints(awayBoard.getPoints() + 3);

            homeBoard.setLost(homeBoard.getLost() + 1);

        }
        else if(match.getWinner().equals(("draw"))){
            // Draw
            homeBoard.setDrawn(homeBoard.getDrawn() + 1);
            awayBoard.setDrawn(awayBoard.getDrawn() + 1);

            homeBoard.setPoints(homeBoard.getPoints() + 1);
            awayBoard.setPoints(awayBoard.getPoints() + 1);
        }
        else{
            return new ResponseEntity<>("winner team does not match, either use the team name or the keyword : draw", HttpStatus.BAD_REQUEST);
        }

        leaderboardDao.save(homeBoard);
        leaderboardDao.save(awayBoard);

        return new ResponseEntity<>("Match added and leaderboard updated", HttpStatus.OK);
    }
}

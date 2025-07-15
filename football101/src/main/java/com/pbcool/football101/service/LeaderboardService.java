package com.pbcool.football101.service;

import com.pbcool.football101.dao.LeaderboardDao;
import com.pbcool.football101.dao.LeagueDao;
import com.pbcool.football101.dao.TeamDao;
import com.pbcool.football101.dto.LeaderboardDTO;
import com.pbcool.football101.models.Leaderboard;
import com.pbcool.football101.models.League;
import com.pbcool.football101.models.Team;
import com.pbcool.football101.requests.LeaderBoardDataRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LeaderboardService {

    @Autowired
    LeaderboardDao leaderboardDao;

    @Autowired
    LeagueDao leagueDao;

    @Autowired
    TeamDao teamDao;

    //method to display leaderboard according to the given league

    public ResponseEntity<List<LeaderboardDTO>> getLeagueFromBoard(String leagueName) {

        //finding league
        Optional<League> league = leagueDao.findByLeagueName(leagueName);

        if(league.isEmpty()){//if no such league is found
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        //getting leaderboard entries with league as leagueName
        List<Leaderboard> entries = leaderboardDao.findByLeague_LeagueNameOrderByPointsDesc(leagueName);

        if(entries.isEmpty()){//shouldn't really happen
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NO_CONTENT); //league exists, but no teams yet
        }

        //CONVERTING leaderboard list to leaderboard-dto list
        List<LeaderboardDTO> dtoList = new ArrayList<>();

        for(Leaderboard lb : entries){
            LeaderboardDTO dto = new LeaderboardDTO(lb);
            dtoList.add(dto);
        }

        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    //method to assign teams
    public ResponseEntity<String> assignTeamToLeague(LeaderBoardDataRequest request) {
        Optional<Team> team = teamDao.findByTeamName(request.getTeamName());
        Optional<League> league = leagueDao.findByLeagueName(request.getLeagueName());

        if (team.isEmpty() || league.isEmpty()) {
            return new ResponseEntity<>("team or league not found", HttpStatus.NOT_FOUND);
        }

        if(leaderboardDao.existsByTeamId(team.get().getId())){
            return new ResponseEntity<>("team already added to league", HttpStatus.CONFLICT);
        }

        Leaderboard leaderboard = new Leaderboard();
        leaderboard.setTeam(team.get());
        leaderboard.setLeague(league.get());

        //initialise stats
        leaderboard.setMatchesPlayed(0);
        leaderboard.setWon(0);
        leaderboard.setLost(0);
        leaderboard.setDrawn(0);
        leaderboard.setPoints(0);

        leaderboardDao.save(leaderboard);

        return new ResponseEntity<>("team assigned", HttpStatus.CREATED);


    }

}

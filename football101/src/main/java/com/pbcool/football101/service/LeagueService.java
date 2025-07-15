package com.pbcool.football101.service;

import com.pbcool.football101.dao.LeagueDao;
import com.pbcool.football101.dao.TeamDao;
import com.pbcool.football101.models.League;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
// import java.util.Optional;

@Service
public class LeagueService {

    @Autowired
    TeamDao teamDao;

    @Autowired
    LeagueDao leagueDao;

//    @Autowired
//    LeagueDataDao leagueDataDao;

    public ResponseEntity<List<League>> getAllLeagues() {

        try{
            return new ResponseEntity<>(leagueDao.findAll(), HttpStatus.OK);
        }
        catch(Exception e){
            e.printStackTrace();
        }

        return new ResponseEntity<>(leagueDao.findAll(), HttpStatus.BAD_REQUEST);

    }


//    public ResponseEntity<String> assignTeamToLeague(LeagueDataRequest request) {
//
//        Optional<Team> teamOpt = teamDao.findById(request.getTeamId());
//        Optional<League> leagueOpt = leagueDao.findById(request.getLeagueId());
//
//        if(teamOpt.isEmpty() || leagueOpt.isEmpty()){
//            return new ResponseEntity<>("team or league not found", HttpStatus.NOT_FOUND);
//        }
//        if(leagueDataDao.existsById(request.getTeamId())){
//            return new ResponseEntity<>("Team already added to league", HttpStatus.CONFLICT);
//        }
//
//        LeagueData leagueData = new LeagueData();
//        leagueData.setTeam(teamOpt.get());
//        leagueData.setLeague(leagueOpt.get());
//
//        // initialize stats
//        leagueData.setWon(0);
//        leagueData.setLost(0);
//        leagueData.setDrawn(0);
//        leagueData.setMatchesPlayed(0);
//        leagueData.setPoints(0);
//
//        leagueDataDao.save(leagueData);
//
//        return new ResponseEntity<>("team assigned", HttpStatus.CREATED);
//
//    }
}

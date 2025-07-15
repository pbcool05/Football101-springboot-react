package com.pbcool.football101.service;

import com.pbcool.football101.dao.TeamDao;
import com.pbcool.football101.models.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TeamService {

    @Autowired
    TeamDao teamDao;

    public ResponseEntity<List<Team>> getAllTeams() {

        try{
            return new ResponseEntity<>(teamDao.findAll(), HttpStatus.OK);
        }
        catch(Exception e){
            e.printStackTrace();
        }

        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<String> addTeam(Team team){

        try{
            teamDao.save(team);
            return new ResponseEntity<>("success", HttpStatus.CREATED);
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("failed to add team", HttpStatus.INTERNAL_SERVER_ERROR);

    }


}

package com.pbcool.football101.controller;

import com.pbcool.football101.models.Team;
import com.pbcool.football101.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("team")
@CrossOrigin("*")
public class TeamController {

    @Autowired
    TeamService teamService;

    @GetMapping("allTeams")
    public ResponseEntity<List<Team>> getAllTeams(){
        return teamService.getAllTeams();
    }

    @PostMapping("add")
    public ResponseEntity<String> addTeam(@RequestBody Team team){
        return teamService.addTeam(team);
    }


}

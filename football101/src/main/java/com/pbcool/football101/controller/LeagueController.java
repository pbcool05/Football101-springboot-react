package com.pbcool.football101.controller;


import com.pbcool.football101.models.League;
import com.pbcool.football101.service.LeagueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("league")
@CrossOrigin("*")
public class LeagueController {

    @Autowired
    LeagueService leagueService;

    @GetMapping("allLeagues")
    public ResponseEntity<List<League>> getAllLeagues(){
        return leagueService.getAllLeagues();
    }

//    @PostMapping("add")
//    public ResponseEntity<String> assignTeamToLeague(@RequestBody LeagueDataRequest request){
//
//        return  leagueService.assignTeamToLeague(request);
//    }


}

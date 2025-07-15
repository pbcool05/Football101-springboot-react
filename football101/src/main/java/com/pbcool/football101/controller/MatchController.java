package com.pbcool.football101.controller;


import com.pbcool.football101.requests.MatchDataRequest;
import com.pbcool.football101.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("match")
@CrossOrigin("*")
public class MatchController {

    @Autowired
    MatchService matchService;

    @PostMapping("add")
    public ResponseEntity<String> updateMatchHistoryAndLeaderBoard(@RequestBody MatchDataRequest match){
        return matchService.updateMatchHistoryAndLeaderBoard(match);
    }

}

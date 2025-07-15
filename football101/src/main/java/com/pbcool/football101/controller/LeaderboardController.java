package com.pbcool.football101.controller;

import com.pbcool.football101.dto.LeaderboardDTO;
import com.pbcool.football101.requests.LeaderBoardDataRequest;
import com.pbcool.football101.service.LeaderboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("leaderboard")
@CrossOrigin("*")
public class LeaderboardController {

    @Autowired
    LeaderboardService leaderboardService;

    @PostMapping("assign")
    public ResponseEntity<String> assignTeamToLeague(@RequestBody LeaderBoardDataRequest request){
        return leaderboardService.assignTeamToLeague(request);
    }

    @GetMapping("getTable")
    public ResponseEntity<List<LeaderboardDTO>> getLeagueFromLeaderBoard(@RequestParam("leagueName") String leagueName){

        /*The reason for making leaderboard DTO is to avoid getting league names
        * as well whilst returning teams in a league from leaderboard.
        *
        * Another reason is to avoid infinite recursion issues which could be induced*/

        return leaderboardService.getLeagueFromBoard(leagueName);

    }
}

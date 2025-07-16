package com.pbcool.football101.controller;

import com.pbcool.football101.dto.PlayerDTO;
import com.pbcool.football101.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("players")
@CrossOrigin("*")
public class PlayerController {

    @Autowired
    PlayerService playerService;

    @GetMapping("/team")
    public ResponseEntity<List<PlayerDTO>> getPlayersFromTeam(@RequestParam("team") String teamName){

        return playerService.getPlayersFromTeam(teamName);
    }
}

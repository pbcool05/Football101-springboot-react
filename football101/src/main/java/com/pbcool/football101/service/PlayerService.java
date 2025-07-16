package com.pbcool.football101.service;

import com.pbcool.football101.dao.PlayerDao;
import com.pbcool.football101.dao.TeamDao;
import com.pbcool.football101.dto.PlayerDTO;
import com.pbcool.football101.models.League;
import com.pbcool.football101.models.Player;
import com.pbcool.football101.models.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {

    @Autowired
    TeamDao teamDao;

    @Autowired
    PlayerDao playerDao;

    public ResponseEntity<List<PlayerDTO>> getPlayersFromTeam(String teamName) {

        Optional<Team> team = teamDao.findByTeamName(teamName);
        System.out.println("Team present: " + team.isPresent());
        team.ifPresent(value -> System.out.println("Team ID: " + value.getId()));

        if(team.isEmpty()){//no such team found
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        //getting player entries with team as teamName
        List<Player> players = playerDao.findByTeam(team.get());
        System.out.println("Players found: " + players.size());
        System.out.println("team name received: " + teamName);

        if(players.isEmpty()){
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NO_CONTENT);
        }

        List<PlayerDTO> playerDTOs = new ArrayList<>();

        for (Player p : players) {
            PlayerDTO dto = new PlayerDTO(
                    p.getName(),
                    p.getAge(),
                    p.getPositions(),
                    p.getMatchesPlayed(),
                    p.getGoals(),
                    p.getAssists()
            );
            playerDTOs.add(dto);
        }

        return new ResponseEntity<>(playerDTOs, HttpStatus.OK);
    }
}

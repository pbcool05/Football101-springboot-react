package com.pbcool.football101.dao;

import com.pbcool.football101.models.Player;
import com.pbcool.football101.models.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerDao extends JpaRepository<Player, Integer> {
    List<Player> findByTeam(Team teamName);
}

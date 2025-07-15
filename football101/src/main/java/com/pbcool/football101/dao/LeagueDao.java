package com.pbcool.football101.dao;

import com.pbcool.football101.models.League;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LeagueDao extends JpaRepository<League, Integer> {
    Optional<League> findByLeagueName(String leagueName);
}

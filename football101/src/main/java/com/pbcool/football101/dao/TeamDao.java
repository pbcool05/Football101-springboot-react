package com.pbcool.football101.dao;

import com.pbcool.football101.models.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeamDao extends JpaRepository<Team, Integer> {

    Optional<Team> findByTeamName(String teamName);

}

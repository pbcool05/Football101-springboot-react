package com.pbcool.football101.dao;

import com.pbcool.football101.models.Leaderboard;
import com.pbcool.football101.models.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LeaderboardDao extends JpaRepository<Leaderboard, Integer> {

    boolean existsByTeamId(Integer teamId);

    List<Leaderboard> findByLeague_LeagueNameOrderByPointsDesc(String leagueName);

//    List<Leaderboard> findByLeague_LeagueName(String leagueName);

    Optional<Leaderboard> findByTeam(Team team);
}

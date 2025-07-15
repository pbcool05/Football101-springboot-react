package com.pbcool.football101.dao;

import com.pbcool.football101.models.MatchRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MatchDao extends JpaRepository<MatchRecord, Integer> {
}

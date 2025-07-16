package com.pbcool.football101.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PlayerDTO {

    private String name;
    private int age;
    private String positions;
    private int matchesPlayed;
    private int goals;
    private int assists;
}

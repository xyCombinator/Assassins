package de.martin.craftnoteassassins.dtos

import java.time.LocalDateTime

data class RoundDTO(val n: Int, val circleName: String, val alivePlayers: List<UserDTO>, val deadPlayers: List<UserDTO>, val endTime: LocalDateTime?){
    var nextVictim: UserDTO? = null
}

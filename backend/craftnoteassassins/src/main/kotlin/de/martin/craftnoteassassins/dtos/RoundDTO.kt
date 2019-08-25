package de.martin.craftnoteassassins.dtos

data class RoundDTO(val n: Int, val circleName: String, val alivePlayers: List<UserDTO>, val deadPlayers: List<UserDTO>){
    var nextVictim: UserDTO? = null
}

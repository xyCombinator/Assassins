package de.martin.craftnoteassassins.dtos

data class CircleDTO(val name :String, val owner: UserDTO) {
    var rounds : MutableList<RoundDTO> = arrayListOf()
    var players: MutableList<UserDTO> = arrayListOf()
}
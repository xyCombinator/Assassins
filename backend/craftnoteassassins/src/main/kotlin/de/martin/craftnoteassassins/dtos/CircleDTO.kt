package de.martin.craftnoteassassins.dtos

data class CircleDTO(val name :String) {
    var rounds : MutableList<RoundDTO> = arrayListOf()
}
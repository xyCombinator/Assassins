package de.martin.craftnoteassassins.dtos

data class CircleParticipationDTO(val circleDTO: CircleDTO, val nextVictim: UserDTO?, val alive: Boolean ) {
}
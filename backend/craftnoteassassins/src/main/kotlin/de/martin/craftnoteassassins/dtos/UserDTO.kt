package de.martin.craftnoteassassins.dtos

data class UserDTO(val name:String, val password : String?){
    var circles: List<CircleDTO> = emptyList()
}